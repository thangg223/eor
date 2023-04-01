const Category = require('../models/categoryModel');

// Lấy danh sách danh mục sản phẩm
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách danh mục' });
  }
};

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo danh mục mới' });
  }
};

// Cập nhật danh mục
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    category.name = name;
    category.description = description;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật danh mục' });
  }
};

// Xóa danh mục
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    await category.remove();
    res.json({ message: 'Danh mục đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa danh mục' });
  }
};
