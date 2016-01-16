import {
  POSTGRES_ADD_TABLES,
  POSTGRES_QUERY_DATA
} from './action_types'

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

export function postgresExecuteQuery (payload) {

  return (dispatch, getState) => {

    let connectionString = 'postgres://dbslone@localhost:15432/decoraid_development'
    let connection = massive.connectSync({connectionString})

    connection.run(listTablesQuery, (err, res) => {
      this.props.addTables(res)
    })
    dispatch(updatePostgresQueryData())
  }
}
