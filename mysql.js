const mysql = require('mysql');
const url = 'mongodb://localhost:27017';
//const connection = new MongoClient(url);
const dbName = 'sastacoupon';
var result1;
async function dbConnect(res) {
  
  const db = mysql.createConnection({
    host: 'sastacoupon.c5lcdzbaqcbr.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'sastacoupon123',
    database: 'sastacoupon'
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