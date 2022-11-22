require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger')


const authService = require("../services/AuthService")

const logIn = async (req, res) => {
    let result;
    try {
        result = await authService.logIn(req.body.email, req.body.password);
        if(result) {
            addJwtToken({ userId: result.userId, email: req.body.email}, res);
            res.status(200).send();
        }
    } catch(err) {
        logger.error(err);
        res.status(404).send(err.message);
    }
};

const signUp = async (req,res) => {
    try {
        await authService.signUp(req.body.email, req.body.password);
        addJwtToken({email: req.body.email}, res);
        res.status(200).send();
    } catch(err) {
        logger.error(err);
        res.status(500).send();
    }
}

const logout = (req, res) => {
    return 'Success';
}

const test = async (req, res) => {
    try {
        res.end(await authService.test("mcpc123"));
    } catch (err) {
        res.status(400).send(err);
    }
}

const addJwtToken = (user, res) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
    res.cookie('Authorization', accessToken);
}


module.exports = {logIn, signUp, logout, test}
