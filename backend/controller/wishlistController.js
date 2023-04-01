const User = require('../models/userModel');
const Product = require('../models/productModel');

// Thêm sản phẩm vào danh sách yêu thích
exports.addToWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
      return;
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }

    const alreadyInWishlist = user.wishlist.find((item) => item.toString() === productId.toString());

    if (alreadyInWishlist) {
      res.status(400).json({ message: 'Sản phẩm đã có trong danh sách yêu thích' });
      return;
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(201).json({ message: 'Sản phẩm đã được thêm vào danh sách yêu thích' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào danh sách yêu thích' });
  }
};

// Lấy danh sách yêu thích của người dùng
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
      return;
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách yêu thích' });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
exports.removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
      return;
    }

    const index = user.wishlist.findIndex((item) => item.toString() === productId.toString());

    if (index === -1) {
      res.status(404).json({ message: 'Sản phẩm không có trong danh sách yêu thích' });
      return;
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi danh sách yêu thích' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm khỏi danh sách yêu thích' });
  }
};
