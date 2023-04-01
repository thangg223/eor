const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getWishlistItems,
  addWishlistItem,
  deleteWishlistItem,
} = require('../controllers/wishlistController');

// GET wishlist items for a specific user
router.get('/', protect, getWishlistItems);

// Add a new item to the wishlist for a specific user
router.post('/', protect, addWishlistItem);

// Delete an item from the wishlist for a specific user
router.delete('/:id', protect, deleteWishlistItem);

module.exports = router;
