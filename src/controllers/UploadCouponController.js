const logger = require('../utils/logger')
const uploadCouponService = require('../services/UploadCouponService');

const getImagesAndOccasion = async (req, res) => {
    try {
        const imageList = await uploadCouponService.getAllImagesAndOccasion();
        res.status(200).send(JSON.stringify(Object.fromEntries(imageList)));
    } catch (err) {
        logger.error('Error - ', err);
        res.status(500).send();
    }
}

const uploadCoupon = (req, res) => {
    try {
        const coupon = JSON.parse(req.brody);
        uploadCouponService.validateAndUploadCoupon();
        res.send(200);
    }catch(err) {
        res.status(400).send(err);
    }
}

module.exports = {getImagesAndOccasion};