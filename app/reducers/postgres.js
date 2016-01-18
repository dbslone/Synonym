import {
  POSTGRES_ADD_TABLES,
  POSTGRES_ADD_CONNECTION,
  POSTGRES_PERFORMANCE,
  POSTGRES_QUERY_DATA
} from '../actions/action_types'

import {groupBy} from 'lodash'

let initialState = {
  connection: {},
  databases: [],
  queryData: {},
  performance: []
}

export default function postgres (state = initialState, action) {

  switch (action.type) {
    case POSTGRES_ADD_TABLES: {
      let databases = groupBy(action.payload, (n) => n.table_catalog)
console.log('databases: ', databases)
      return {
        ...state,
        databases
      }
    }

    case POSTGRES_ADD_CONNECTION: {
      return {
        ...state,
        connection: action.payload
      }
    }

    case POSTGRES_QUERY_DATA: {
      return {
        ...state,
        queryData: action.payload
      }
    }

    case POSTGRES_PERFORMANCE: {
      return {
        ...state,
        performance: action.payload
      }
    }

    default:
      return state
  }
}
