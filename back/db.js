require('dotenv').config()
const mysql = require('mysql2')

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'gusdn6671'
const password = process.env.DB_PASSWORD || 'Gusdn6671****'
const database = process.env.DB_DATABASE || 'jenny'

const timezone = '+00:00';

const config = {host, user, password, database, timezone};
const pool = mysql.createPool(config);
const promisePool = pool.promise();

exports.pool = promisePool;