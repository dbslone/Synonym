import {
  POSTGRES_ADD_TABLES,
  POSTGRES_QUERY_DATA
} from '../actions/action_types'

import {groupBy} from 'lodash'

let initialState = {
  databases: [],
  queryData: {}
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

    case POSTGRES_QUERY_DATA: {
      
    }

    default:
      return state
  }
}
