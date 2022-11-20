require('dotenv').config();
const jwt = require('jsonwebtoken')


const authMiddleWare = async (req, res, next) => {
    try {
        const accessToken = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    
        if (accessToken) {
          const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
          const verificationResponse = (await jwt.verify(accessToken, secretKey));
          //const userId = verificationResponse._id;
          console.log(verificationResponse);
          next();
        //   const findUser = await userModel.findById(userId);
    
        //   if (findUser) {
        //     req.user = findUser;
        //     next();
        //   } else {
        //     next(new HttpException(401, 'Wrong authentication token'));
        //   }
        } else {
          next(new Error(404, 'Authentication token missing'));
        }
      } catch (error) {
        next(new Error(401, 'Wrong authentication token'));
      }
}
 
module.exports = authMiddleWare;