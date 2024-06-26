import pg from 'pg'

//Import the enviroment variables from the .env file

import {
  PGHOST,
  PGPORT,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
} from './config.js'

const { Client } = pg
pg.types.setTypeParser(1700, (val) => {
  return parseFloat(val)
})

//Postgres database connection.

const client = new Client({
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD
})

export default client;