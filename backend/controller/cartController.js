const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng' });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Giỏ hàng đã tồn tại, cập nhật sản phẩm hoặc thêm mới
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
      res.json(cart);
    } else {
      // Tạo giỏ hàng mới
      const newCart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });

      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng' });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng' });
  }
};

