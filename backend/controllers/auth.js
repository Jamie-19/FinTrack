// controllers/authController.js
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    // Save the user
    await user.save();

    // Now, you can access the user's _id property
    const userId = user._id;

    // Return userId to the frontend
    res.status(201).json({ message: 'User registered successfully', userId , username});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id, username: user.username }, 'secretKey', { expiresIn: '1h' });
      res.json({ userId: user._id, username: user.username});
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login };