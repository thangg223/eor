const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// Đăng ký người dùng mới
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'Người dùng đã tồn tại' });
      return;
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Thông tin người dùng không hợp lệ' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ký người dùng mới' });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng nhập' });
  }
};

// Lấy thông tin người dùng
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
  }
};

// Cập nhật thông tin người dùng
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin người dùng' });
  }
};
