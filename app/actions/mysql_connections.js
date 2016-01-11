import {
  ADD_MYSQL_CONNECTION,
  REMOVE_MYSQL_CONNECTION
} from './action_types'


export function addMysqlConnection (payload) {

  return {
    type: ADD_MYSQL_CONNECTION,
    payload
  }
}

export function removeMysqlConnection (payload) {

  return {
    type: REMOVE_MYSQL_CONNECTION,
    payload
  }
}
