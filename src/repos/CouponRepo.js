const db = require('../../mysql');

const insertCoupon = async (coupon) => {
    return await db.promise().query(`INSERT INTO sastacoupon.COUPON (NAME, DESCRIPTION, EXPIRY, PRICE, SELLER_ID, IMAGE_ID, CREATE_TIMESTAMP, COUPON_CODE) VALUES (
        ${coupon.couponName}, ${coupon.descrption}, ${coupon.expiryDate}, ${coupon.sellerId}, ${coupon.imageId}, ${new Date()}, ${coupon.couponCode}`);
}

module.exports = {insertCoupon}