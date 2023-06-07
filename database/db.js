const Pool = require("pg").Pool;
require("dotenv").config();

const db = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    port: process.env.PGSQL_PORT,
    host: process.env.PGSQL_HOST
});

module.exports = db;
