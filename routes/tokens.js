const express = require('express');
const router = express.Router();
const { readDataFile, writeDataFile } = require('../middleware/authMiddleware');

router.get('/balance', (req, res) => {
  const authToken = req.headers['auth-token'];
  let clientData = readDataFile();

  if (!clientData.hasOwnProperty(authToken)) {
    return res.status(403).json({ error: 'Permission Denied', code: 'ACCESS_DENIED' });
  }

  const balance = clientData[authToken].tokens - clientData[authToken].apiCalls;

  // Respond with the current token balance
  res.json({ balance: balance });
});

// Add other token-related routes as needed

module.exports = router;
