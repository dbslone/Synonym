import {
  POSTGRES_ADD_CONNECTION,
  POSTGRES_ADD_TABLES,
  POSTGRES_DISPLAY_TABLE,
  POSTGRES_PERFORMANCE,
  POSTGRES_QUERY_DATA,
  POSTGRES_UPDATE_TABLE_DATA,
  POSTGRES_UPDATE_TABLE_SCHEMA
} from '../actions/action_types'

import {groupBy} from 'lodash'

let initialState = {
  connection: {},
  databases: {},
  performance: [],
  queryData: {},
  tableData: [],
  tableSchema: [],
  view: 'index'
}

export default function postgres (state = initialState, action) {

  switch (action.type) {
    case POSTGRES_ADD_TABLES: {
      let databases = groupBy(action.payload, (n) => n.table_catalog)

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

    case POSTGRES_DISPLAY_TABLE: {
      return {
        ...state,
        table: action.payload,
        view: 'table'
      }
    }

    case POSTGRES_UPDATE_TABLE_DATA: {

      return {
        ...state,
        tableData: action.payload
      }
    }

    case POSTGRES_UPDATE_TABLE_SCHEMA: {

      return {
        ...state,
        tableSchema: action.payload
      }
    }

    default:
      return state
  }
}
