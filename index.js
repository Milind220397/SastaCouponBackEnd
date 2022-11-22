require('dotenv').config();
const express = require("express");
const cors = require('cors')
const dbConnect = require('./mysql');
const app = express();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const PORT = process.env.PORT;
const logger = require('./src/utils/logger');
const AuthRoutes = require('./src/routes/AuthRoutes') 
const uploadCouponRoutes = require('./src/routes/UploadCouponRoutes');
app.use(require('cookie-parser')());
require('./mysql');
app.use(cors())
app.use(express.json())


const profile = require('./src/routes/profile');
const productdet = require('./src/routes/productdet')
const payment = require('./routes/payment');
app.use('/profile', profile);
app.use('/productdet', productdet);
app.use('/razorpay', payment);
app.use('/', AuthRoutes);
app.use('/', uploadCouponRoutes);

app.listen(PORT, () => {
  logger.info(`server running at 127.0.0.1:${PORT}`);
});