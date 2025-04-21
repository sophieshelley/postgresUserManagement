const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Sequelize model
const Sequelize = require('sequelize');

// Get all users with optional search and sorting
router.get('/', async (req, res) => {
  try {
    const { sort, search } = req.query;
    let queryOptions = {};

    // Search functionality (search by firstName or lastName)
    if (search) {
      queryOptions.where = {
        [Sequelize.Op.or]: [
          { firstName: { [Sequelize.Op.iLike]: `%${search}%` } }, // Case-insensitive search
          { lastName: { [Sequelize.Op.iLike]: `%${search}%` } }
        ]
      };
    }

    // Sorting functionality by both firstName and lastName
    if (sort === 'asc') {
      queryOptions.order = [
        ['firstName', 'ASC'],  // Sort by first name
        ['lastName', 'ASC']    // Then sort by last name
      ];
    } else if (sort === 'desc') {
      queryOptions.order = [
        ['firstName', 'DESC'],  // Sort by first name
        ['lastName', 'DESC']    // Then sort by last name
      ];
    }

    const users = await User.findAll(queryOptions);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  // Log the incoming request body to see what we are receiving
  console.log('Received data:', req.body);

  const { firstName, lastName, email, age } = req.body;

  try {
    // Check if all required fields are present
    if (!firstName || !lastName || !email || !age) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newUser = await User.create({ firstName, lastName, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updatedUser.update(req.body); // Update user with the data from the request body
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
