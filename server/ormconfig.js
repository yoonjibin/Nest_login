module.exports = {
  "type": "mssql",
  "host": "localhost",
  "port": 3306,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": ["dist/**/*.entity{.ts.js}"],
  "synchronize": true
}
