import {
  INITIALIZE_CONNECTIONS,
  LS_ALL_CONNECTIONS_KEY
} from './action_types'

import {map, reject} from 'lodash'
let ls = require('local-storage')

export function initializeConnections () {

  let connections = map(ls.get(LS_ALL_CONNECTIONS_KEY), (lsKey) => {


  })

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
