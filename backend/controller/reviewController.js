const Product = require('../models/productModel');

// Tạo đánh giá mới cho sản phẩm
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }

    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này trước đây' });
      return;
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, curr) => curr.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Đánh giá đã được thêm' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo đánh giá mới' });
  }
};

// Lấy tất cả đánh giá của sản phẩm
exports.getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }

    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá sản phẩm' });
  }
};

// Xóa đánh giá sản phẩm
exports.deleteReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }

    const review = product.reviews.find((review) => review._id.toString() === reviewId);

    if (!review) {
      res.status(404).json({ message: 'Đánh giá không tồn tại' });
      return;
    }

    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Bạn không có quyền xóa đánh giá này' });
      return;
    }

    product.reviews = product.reviews.filter((review) => review._id.toString() !== reviewId);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, curr) => curr.rating +     acc, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({ message: 'Đánh giá đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa đánh giá' });
  }
};

// Cập nhật đánh giá sản phẩm
exports.updateReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      return;
    }

    const reviewIndex = product.reviews.findIndex((review) => review._id.toString() === reviewId);

    if (reviewIndex === -1) {
      res.status(404).json({ message: 'Đánh giá không tồn tại' });
      return;
    }

    if (product.reviews[reviewIndex].user.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Bạn không có quyền cập nhật đánh giá này' });
      return;
    }

    product.reviews[reviewIndex].rating = rating;
    product.reviews[reviewIndex].comment = comment;
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, curr) => curr.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({ message: 'Đánh giá đã được cập nhật' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật đánh giá' });
  }
};

