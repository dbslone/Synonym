import {combineReducers} from 'redux'

import connections from './connections'
import dialogs from './dialogs'
import homepage from './homepage'
import mysqlConnections from './mysql_connections'
import postgres from './postgres'

const rootReducer = combineReducers({
  connections,
  dialogs,
  homepage,
  mysqlConnections,
  postgres
})

export default rootReducer
