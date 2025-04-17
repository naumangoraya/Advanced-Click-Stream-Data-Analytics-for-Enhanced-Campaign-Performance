// Database connection utility for MS SQL Server with Windows Authentication

import sql from "mssql"

// Configuration for Windows Authentication
const config = {
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_NAME || "ecommerce_analytics",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
    encrypt: false,
    integratedSecurity: true,
  },
}

// Create a connection pool
let pool

export async function connectToDatabase() {
  try {
    if (!pool) {
      console.log("Creating new connection pool...")
      pool = await sql.connect(config)
    }
    return pool
  } catch (error) {
    console.error("Database connection error:", error)
    throw error
  }
}

export async function executeQuery(query, params = []) {
  try {
    const pool = await connectToDatabase()
    const request = pool.request()

    // Add parameters if any
    params.forEach((param, index) => {
      request.input(`param${index}`, param.value)
    })

    const result = await request.query(query)
    return result.recordset
  } catch (error) {
    console.error("Query execution error:", error)
    throw error
  }
}

export async function closeDatabaseConnection() {
  try {
    if (pool) {
      await pool.close()
      pool = null
      console.log("Database connection closed.")
    }
  } catch (error) {
    console.error("Error closing database connection:", error)
    throw error
  }
}
