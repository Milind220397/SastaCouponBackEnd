const express = require("express");
const router = express.Router();
const uploadCouponController = require('../controllers/UploadCouponController');

router.get('/images', uploadCouponController.getImagesAndOccasion);

module.exports = router;