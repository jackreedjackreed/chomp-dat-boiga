// Set up MySQL Connection
const mysql = require('mysql')
var dotenv = require('dotenv').config()
var pw = process.env.raisins

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: pw,
        database: 'boiga_db'
    })
}

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