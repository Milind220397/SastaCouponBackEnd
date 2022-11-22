const db = require('../../mysql');

const findByEmaiId = async (email) => {
    return db.promise().query(`SELECT * from USERS where EMAIL_ID='${email}'`)
}

const findByUserId = async (userId) => {
    return db.promise().query(`SELECT * from USERS where ID=${userId}`);
}

const insertUser = async (email, password) => {
    return db.promise().query(`INSERT INTO USERS (EMAIL_ID, PASSWORD) VALUES ('${email}', '${password}')`);
}

module.exports = {findByEmaiId, findByUserId, insertUser}