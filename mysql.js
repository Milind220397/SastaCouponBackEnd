const mysql = require('mysql');
const logger = require('./src/utils/logger');
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
        logger.info(err);
      } else {
        logger.info("MYSQL CONNECTED")
      }
  });
  
  return db;
}

const db = dbConnect();

module.exports = db;