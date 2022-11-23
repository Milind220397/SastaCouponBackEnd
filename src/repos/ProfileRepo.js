const db = require('../../mysql');


const findProfile = async (userId) => {
    console.log("Inside Profile Repo ")   ;
    return db.promise().query(`SELECT USERS.ID,EMAIL_ID,FIRST_NAME,LAST_NAME,ADDRESS_ID,CONTACT,WALLET_AMOUNT,STREET,CITY,STATE,COUNTRY,ZIPCODE FROM USERS INNER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID WHERE USERS.ID = ${userId}`);
}

module.exports = { findProfile }