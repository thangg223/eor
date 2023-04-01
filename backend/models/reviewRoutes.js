const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createProductReview,
  getProductReviews,
} = require('../controllers/reviewController');

router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/reviews').get(getProductReviews);

module.exports = router;
