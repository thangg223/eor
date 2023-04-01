const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');
const { isAdmin, isAuth } = require('../middleware/authMiddleware');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Get category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Create category
router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    const createdCategory = await category.save();
    res.status(201).send(createdCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Update category
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = name;
      const updatedCategory = await category.save();
      res.send(updatedCategory);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Delete category
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.send({ message: 'Category deleted' });
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
