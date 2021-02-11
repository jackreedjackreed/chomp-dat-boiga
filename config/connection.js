// Set up MySQL Connection
const mysql = require('mysql')
var dotenv = require('dotenv').config()
var pw = process.env.raisins

const connection = mysql.connection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: pw,
    database: 'burgers_db'
});

// Make Connection
connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

// Export connection for our ORM to use
module.exports = connection;