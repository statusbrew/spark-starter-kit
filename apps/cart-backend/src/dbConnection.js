const mysql =require( "mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'cartDB'
  });
 module.exports={connection};