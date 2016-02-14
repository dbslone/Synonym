import {
  POSTGRES_ADD_CONNECTION,
  POSTGRES_ADD_TABLE_DATA,
  POSTGRES_ADD_TABLES,
  POSTGRES_DISPLAY_TABLE,
  POSTGRES_PERFORMANCE,
  POSTGRES_QUERY_DATA,
  POSTGRES_UPDATE_TABLE_DATA,
  POSTGRES_UPDATE_TABLE_SCHEMA
} from './action_types'

import {map} from 'lodash'

let massive = require('massive')

export function postgresAddConnection (payload) {

  return {
    type: POSTGRES_ADD_CONNECTION,
    payload
  }
}

export function postgresAddTableData (payload) {

  return {
    type: POSTGRES_ADD_TABLE_DATA,
    payload
  }
}

export function postgresAddTables (payload) {

  return {
    type: POSTGRES_ADD_TABLES,
    payload
  }
}

export function postgresUpdateTableData (payload) {

  return {
    type: POSTGRES_UPDATE_TABLE_DATA,
    payload
  }
}

export function updatePostgresQueryData (payload) {

  return {
    type: POSTGRES_QUERY_DATA,
    payload
  }
}

export function postgresUpdatePerformance (payload) {

  return {
    type: POSTGRES_PERFORMANCE,
    payload
  }
}

export function postgresDisplayTable (payload) {

  return {
    type: POSTGRES_DISPLAY_TABLE,
    payload
  }
}

export function postgresUpdateTableSchema (payload) {

  return {
    type: POSTGRES_UPDATE_TABLE_SCHEMA,
    payload
  }
}

export function postgresFetchTable (table) {

  return (dispatch, getState) => {

    let state = getState()
    let connection = massive.connectSync({connectionString: state.postgres.connection.connectionString})

    connection.run(`SELECT * FROM information_schema.columns WHERE table_name="${table}"`, (err, res) => {

      dispatch(postgresUpdateTableSchema(res))
      connection.run(`SELECT * FROM ${table} LIMIT 100`, (tableErr, tableRes) => {

        dispatch(postgresUpdateTableData(tableRes))
      })
    })
  }
}

export function postgresListTables () {

  return (dispatch, getState) => {

    let state = getState()
    let connection = massive.connectSync({connectionString: state.postgres.connection.connectionString})

    connection.run("SELECT * FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public' ORDER BY table_catalog, table_name", (err, res) => {

      dispatch(postgresAddTables(res))
    })
  }
}

export function postgresExecuteQuery (query) {

  return (dispatch, getState) => {

    let state = getState()
    let connection = massive.connectSync({connectionString: state.postgres.connection.connectionString})

    connection.run(query, (err, response) => {

      dispatch(updatePostgresQueryData(response))
    })
  }
}

export function postgresPerformanceQuery () {

  return (dispatch, getState) => {

    let state = getState()
    let connection = massive.connectSync({connectionString: state.postgres.connection.connectionString})

    connection.run("select pid,datname,query,now() - pg_stat_activity.query_start as duration from pg_stat_activity where pg_stat_activity.query <> ''::text and now() - pg_stat_activity.query_start > interval '5 minutes'", (err, response) => {

      dispatch(postgresUpdatePerformance(response))
    })
  }
}
