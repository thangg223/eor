const Address = require('../models/addressModel');

// Lấy danh sách địa chỉ của người dùng
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách địa chỉ' });
  }
};

// Thêm địa chỉ mới
exports.addAddress = async (req, res) => {
  try {
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country } = req.body;

    const newAddress = new Address({
      user: req.user._id,
      fullName,
      phoneNumber,
      streetAddress,
      city,
      state,
      postalCode,
      country,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm địa chỉ mới' });
  }
};

// Cập nhật địa chỉ
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country } = req.body;

    const address = await Address.findOne({ _id: addressId, user: req.user._id });

    if (!address) {
      return res.status(404).json({ message: 'Địa chỉ không tồn tại' });
    }

    address.fullName = fullName;
    address.phoneNumber = phoneNumber;
    address.streetAddress = streetAddress;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;

    await address.save();
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật địa chỉ' });
  }
};

// Xóa địa chỉ
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOne({ _id: addressId, user: req.user._id });

    if (!address) {
      return res.status(404).json({ message: 'Địa chỉ không tồn tại' });
    }

    await address.remove();
    res.json({ message: 'Địa chỉ đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa địa chỉ' });
  }
};
