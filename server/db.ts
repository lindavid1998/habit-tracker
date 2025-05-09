import { Pool } from 'pg'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

interface DatabaseConfig {
  user: string,
  password: string,
  host: string,
  port: number,
  database: string
}

const dbConfig: DatabaseConfig = {
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432, // default Postgres port
  database: process.env.DB_NAME || ''
}

const pool = new Pool(dbConfig)

export { pool }
