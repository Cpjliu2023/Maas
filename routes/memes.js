const express = require('express');
const memeGenerator = require('../utils/memeGenerator');
const router = express.Router();

// API endpoint for fetching memes
router.get('/', (req, res) => {
  const authToken = req.headers['auth-token'];

  // Update token balance (assumes another team handles this)
  // Note: In a real-world scenario, token balance would be updated after a successful payment.

  // Your existing code to generate and return memes goes here
  const randomMeme = memeGenerator.generateRandomMeme();

  res.status(200).json(randomMeme);
});

module.exports = router;
