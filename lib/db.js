const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'lordgent',
    password: 'pass',
    database: 'bokingweb'
})

conn.connect(  (err) =>  {


   if(err) throw err;
   console.log('database connect ....');


} ) 





module.exports = conn