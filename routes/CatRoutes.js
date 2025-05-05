const express = require('express');
const router = express.Router();
const Category = require('../models/Cat');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    return res.send(categories.sort((a, b) => a.Name.localeCompare(b.Name)));
  } catch (error) {
    res.status(500).send('Error fetching categories');
  }
});

// Get category by Name
router.get('/:Name', async (req, res) => {
  const { Name } = req.params;

  try {
    const category = await Category.findOne({ Name });
    if (!category) {
      return res.status(404).send('Category not found');
    }
    return res.send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching category');
  }
});

module.exports = router;
