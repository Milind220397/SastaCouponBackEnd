require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const mysql = require('mysql');
const logger = require('../utils/logger')
const db = require('../../mysql');

const razorpay = new Razorpay({
    key_id: 'rzp_test_NpKUjWehxc13rP',
    key_secret: 'XutQhK8ic37ngBLlmN2A499v'
})

const payment = async (req, res) => {
    console.log("Inside razor post");
    // console.log(req);
    const payment_capture = 1
    const amount = req.body.amount * 100;
    console.log(amount);
    const currency = 'INR';

    const options = {
        amount: amount,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
}

const verification = (req, res) => {

    console.log("inside verifuy");
    let user_id = req.query.id;
    var result1;
    var sql = 'INSERT INTO ORDER_DETAILS (ORDER_ID,COUPON_ID,STATUS,BUYER_ID,TRANSACTION_TYPE,PAYMENT_TIMESTAMP,PAYMENT_ID)VALUES ?';

    // const db = mysql.createConnection({
    //     host: 'sastacoupon.c5lcdzbaqcbr.ap-northeast-1.rds.amazonaws.com',
    //     user: 'admin',
    //     password: 'sastacoupon123',
    //     database: 'sastacoupon'
    // })

    const secret = 'sastacoupon123'
    console.log(req.body)
    const res_verify = req.body.payload.payment.entity;
    console.log(req.body.payload.payment.entity)
    // *****Verifing the Signature *******************
    const crypto = require('crypto')
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    console.log(digest, req.headers['x-razorpay-signature'])
    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // *********************** Send payment detils to database***************************
        var values = [
            [res_verify.order_id, '1234', res_verify.status, user_id, 'Bought', res_verify.created_at,res_verify.id]
        ];
        // db.connect((err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("MYSQL CONNECTED")
        //     }
            db.query(sql, [values], function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Executed Successfully');
                    console.log(result.affectedRows + " record(s) updated");
                }
                if (result.length === 0) {
                    res.send("Incorrect Id")
                }
                else {
                    console.log("" + JSON.stringify(result));
                    // res.send(JSON.stringify(result.affectedRows));
                }
            });

       // })


    } else {
        // pass it
    }
    res.json({ status: 'ok' })

}

const product_details = (req, res) => {
    logger.info(`Product Detail Controller Triggered`);
    let coupon_id =req.query.id;
    console.log(req.query);
   
    var result1;
    var sql = 'SELECT a.ID,a.NAME, a.DESCRIPTION,a.EXPIRY,a.PRICE,a.SELLER_ID,a.BUYER_ID,a.IMAGE_ID,a.CREATED_TIMESTAMP,a.COUPON_CODE, b.URL, b.OCCASION ,b.DAFAULT_IMAGE  FROM COUPON AS a INNER JOIN COUPON_IMAGE AS b ON a.IMAGE_ID=b.ID WHERE a.ID = ?';

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

        db.query(sql, [coupon_id], function (err, result, fields) {
            if (err) {
                console.log(err);
            }
            console.log(err);
            console.log('Executed Successfully');
            if (result.length === 0) {
                res.send("Incorrect Coupon Id")
            }
            else {
                logger.info("Response of Product details:" + JSON.stringify(result));
                res.send(JSON.stringify(result[0]));
            }
        });
    })
}

module.exports = {  payment, verification, product_details }