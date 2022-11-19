const express = require("express");
const cors = require('cors')
const dbConnect = require('./mysql');
const app = express();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json())


const profile = require('./routes/profile');
const productdet = require('./routes/productdet')
const payment = require('./routes/payment');
app.use('/profile', profile);
app.use('/productdet', productdet);
app.use('/razorpay', payment);

app.listen(1337, () => {
  console.log(`server running at 127.0.0.1:${PORT}`);
});