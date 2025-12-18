const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Apply rate limiting to all routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

router.use(limiter);

// Example route handlers
router.get('/transactions', (req, res) => {
  // Route logic here
  res.send('Transactions data');
});

router.post('/transactions', (req, res) => {
  // Route logic here
  res.send('Transaction created');
});

module.exports = router;
