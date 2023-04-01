const Product = require('../models/productModel');

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm' });
  }
};

// Lấy thông tin sản phẩm theo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin sản phẩm' });
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { name, image, description, brand, category, price, countInStock, rating, numReviews } = req.body;

    const newProduct = new Product({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      rating,
      numReviews,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm mới' });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, image, description, brand, category, price, countInStock, rating, numReviews } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    product.name = name;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
    product.rating = rating;
    product.numReviews = numReviews;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm' });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    await product.remove();
    res.json({ message: 'Sản phẩm đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
  }
};
