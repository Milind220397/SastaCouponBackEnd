const profileRepo = require('../repos/ProfileRepo');

const mysql = require('mysql');


const getUserDetail = async (userId) => {
    console.log("Inside Profile Service")
    return await profileRepo.findProfile(userId).then((data) => {
        if(data[0].length>0) {
               console.log("Inside Profile Service ")   ;

                return data[0];
            
        } else {
            throw new Error('User not found');
        } 
        console.log(data);
            return data[0];
        
    });
}

module.exports = {getUserDetail}