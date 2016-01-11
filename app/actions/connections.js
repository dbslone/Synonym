import {
  DELETE_CONNECTION,
  INITIALIZE_CONNECTIONS
} from './action_types'

export function initializeConnections (payload) {

  return {
    type: INITIALIZE_CONNECTIONS,
    payload
  }
}

export function deleteConnection (payload) {

  return {
    type: DELETE_CONNECTION,
    payload
  }
}
