import {
  LS_ALL_CONNECTIONS_KEY,
  RESET_ADD_CONNECTION_DIALOG,
  TOGGLE_ADD_CONNECTION_DIALOG,
  TOGGLE_LEFT_POPOVER,
  UPDATE_ADD_CONNECTION_FIELD
} from './action_types'

import * as synonymConnections from './connections'

import {
  isEmpty,
  isNull
} from 'lodash'
let massive = require('massive')
let ls = require('local-storage')

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

    let connections,
        obj = payload

    try {
      connections = ls.get(LS_ALL_CONNECTIONS_KEY)
      console.log('connections: ', connections)
      if (connections !== null) {

      }
    }
    catch (err) {
      connections = []
    }

    if (ls.get(obj.nickname) !== null) {
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

          // fs.writeFileSync('databases.json', JSON.stringify(connections))
          ls.set(obj.nickname, obj.connectionString)
          connections = ls.get(LS_ALL_CONNECTIONS_KEY) || []
          console.log('connections: ', connections)
          ls.set(LS_ALL_CONNECTIONS_KEY, connections.concat(obj.nickname))

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

  if (connection.ssl) {
    connectionString = `${connectionString}?ssl=true`
  }

  return connectionString
}
