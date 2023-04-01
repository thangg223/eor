const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'Không có sản phẩm nào trong giỏ hàng' });
      return;
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo đơn hàng' });
  }
};

// Lấy thông tin đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn hàng' });
  }
};

// Cập nhật trạng thái thanh toán đơn hàng
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái thanh toán' });
  }
};

// Lấy danh sách đơn hàng của người dùng
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng của người dùng' });
  }
};
