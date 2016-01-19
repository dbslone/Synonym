import {
  INITIALIZE_CONNECTIONS
} from './action_types'

import {reject} from 'lodash'
let fs = require('fs')

export function initializeConnections () {

  let connections
  try {
    connections = JSON.parse(fs.readFileSync('databases.json', {encoding: 'utf8'}))
  }
  catch (err) {
    connections = []
  }

  return {
    type: INITIALIZE_CONNECTIONS,
    payload: connections
  }
}

export function deleteConnection (nickname) {

  return (dispatch, getState) => {

    let state = getState()

    let connections = reject(state.connections, {nickname})

    fs.writeFileSync('databases.json', JSON.stringify(connections), 'utf8')
    dispatch(initializeConnections())
  }
}
