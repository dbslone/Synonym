let postgres = {
  slowQueries: 'SELECT * FROM pg_stat_activity',
  listTables: "SELECT * FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public' ORDER BY table_catalog, table_name"
}

export default postgres
