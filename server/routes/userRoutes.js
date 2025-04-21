const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Sequelize = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { sort, search } = req.query;
    let queryOptions = {};

    if (search) {
      queryOptions.where = {
        [Sequelize.Op.or]: [
          { firstName: { [Sequelize.Op.iLike]: `%${search}%` } },
          { lastName: { [Sequelize.Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (sort === 'asc') {
      queryOptions.order = [
        ['firstName', 'ASC'],  
        ['lastName', 'ASC']    
      ];
    } else if (sort === 'desc') {
      queryOptions.order = [
        ['firstName', 'DESC'], 
        ['lastName', 'DESC']    
      ];
    }

    const users = await User.findAll(queryOptions);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  
  console.log('Received data:', req.body);

  const { firstName, lastName, email, age } = req.body;

  try {
    if (!firstName || !lastName || !email || !age) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newUser = await User.create({ firstName, lastName, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updatedUser.update(req.body); 
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
