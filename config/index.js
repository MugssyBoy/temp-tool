const mysql = require('mysql')
const ckey = require('ckey')

const connection = () => {
    return {
        host: ckey.DB_HOST,
        user: ckey.DB_USER,
        password: ckey.DB_PASS,
        database: ckey.DB_SCHEMA
    }
}

let db = mysql.createConnection(connection())
.connect((err) => {
    if (err) throw err;
    console.log('DB Connected..');
});

let updateStatus = (status, filename) => {
    let sql = `
    UPDATE
    cbpo_tools
    SET
    file_status = '${status}'
    WHERE
    filename = '${filename}'
    `;
    db.query(sql, (err, row, fields) => {
        if (err) throw err;
        console.log(`updated status for filename ${filename}`)
    });
}