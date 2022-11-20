const mysql = require('mysql');
require('dotenv').config();
const dbConnect = async () => {
  
  const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  })
  
  
  db.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("MYSQL CONNECTED")
      }
      db.query(sql, [user_id], function (err, result, fields) {
          if (err) {
            console.log(err);
          }
          console.log('Executed Successfully');
          result1 = result;
         
        });
    })

  
}
module.exports = dbConnect;