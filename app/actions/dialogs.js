import {
  RESET_ADD_CONNECTION_DIALOG,
  TOGGLE_ADD_CONNECTION_DIALOG,
  TOGGLE_LEFT_POPOVER,
  UPDATE_ADD_CONNECTION_FIELD
} from './action_types'

import * as synonymConnections from './connections'

import {
  isEmpty,
  isNull,
  findWhere,
  isUndefined
} from 'lodash'
let massive = require('massive')

export function toggleAddConnectionDialog (payload) {

  return {
    type: TOGGLE_ADD_CONNECTION_DIALOG,
    payload
  }
}

export function resetAddConnectionDialog () {

  return {
    type: RESET_ADD_CONNECTION_DIALOG
  }
}

export function updateAddConnectionField (payload) {

  return {
    type: UPDATE_ADD_CONNECTION_FIELD,
    payload
  }
}

export function toggleLeftPopover (payload) {

  return {
    type: TOGGLE_LEFT_POPOVER,
    payload
  }
}

export function createNewConnection (payload) {

  return (dispatch) => {

    let fs = require('fs')
    let connections,
        obj = payload

    try {
      connections = JSON.parse(fs.readFileSync('databases.json', {encoding: 'utf8'}))
    }
    catch (err) {
      connections = []
    }

    if (!isUndefined(findWhere(connections, {nickname: obj.nickname}))) {
      alert('Connection already exists with this name.')
      return
    }

    obj.connectionString = buildConnectionString(obj)

    massive.connect({connectionString: obj.connectionString},
      (err) => {
        if (!isNull(err)) {
          alert('Unable to add the connection please try again.')
          console.error('Error: Unable to add the connection. Please check your settings and try again.', err)
        }
        else {
          connections.push(obj)

          fs.writeFileSync('databases.json', JSON.stringify(connections))

          dispatch(resetAddConnectionDialog())
          dispatch(toggleAddConnectionDialog())
          dispatch(synonymConnections.initializeConnections())
        }
      }
    )
  }
}

function buildConnectionString (connection) {

  let connectionString = 'postgres://'

  if (!isEmpty(connection.username)) {
    connectionString = connectionString + connection.username
  }

  if (!isEmpty(connection.password)) {
    connectionString = `${connectionString}:${connection.password}`
  }

  connectionString = `${connectionString}@${connection.address}`
  if (!isEmpty(connection.port)) {
    connectionString = `${connectionString}:${connection.port}`
  }
  else {
    connectionString = `${connectionString}:5432`
  }

  if (!isEmpty(connection.database)) {
    connectionString = `${connectionString}/${connection.database}`
  }

  return connectionString
}
