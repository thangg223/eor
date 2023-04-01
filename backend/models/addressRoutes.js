const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
  getAllAddresses,
} = require('../controllers/addressController');

router.post('/', protect, createAddress);
router.put('/:id', protect, updateAddress);
router.delete('/:id', protect, deleteAddress);
router.get('/:id', protect, getAddressById);
router.get('/', protect, getAllAddresses);

module.exports = router;
