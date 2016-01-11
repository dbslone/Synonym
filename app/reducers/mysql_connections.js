import {
  ADD_MYSQL_CONNECTION,
  REMOVE_MYSQL_CONNECTION
} from '../actions/action_types'

let initialState = {
  connections: []
}

export default function mysqlConnection (state = initialState, action) {

  switch (action.type) {

    case ADD_MYSQL_CONNECTION: {
      return {
        ...state,
        connections: action.payload
      }
    }

    case REMOVE_MYSQL_CONNECTION: {
      return {
        ...state,
        connections: action.payload
      }
    }

    default:
      return state
  }
}
