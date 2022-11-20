require('dotenv').config();


const AuthService = require("../services/AuthService")

const logIn = (req, res) => {
    const result = AuthService.login(req.body.email, req.body.password);
};

const signUp = (req,res) => {
    res.end('Done')
}

const test = (req, res) => {
    res.end('Success');
}


module.exports = {logIn, signUp, test}
