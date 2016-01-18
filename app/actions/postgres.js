import {
  POSTGRES_ADD_CONNECTION,
  POSTGRES_ADD_TABLES,
  POSTGRES_PERFORMANCE,
  POSTGRES_QUERY_DATA
} from './action_types'

// import {postgres} from '../queries'

let massive = require('massive')

export function postgresAddConnection (payload) {

  return {
    type: POSTGRES_ADD_CONNECTION,
    payload
  }
}

export function postgresAddTables (payload) {

  return {
    type: POSTGRES_ADD_TABLES,
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

    connection.run('SELECT * FROM pg_stat_activity', (err, response) => {

      // dispatch(postgresUpdatePerformance(response))
    })
  }
}
