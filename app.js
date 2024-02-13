const express = require('express');
const app = express();

// Import your middlewares
const { standardMiddleware, balanceMiddleware } = require('./middleware/authMiddleware');

// Apply standardMiddleware for regular API calls
app.use('/memes', standardMiddleware);

// Apply balanceMiddleware for /tokens/balance API call
app.use('/tokens/balance', balanceMiddleware);

// Define your routes
const memesRouter = require('./routes/memes');
const tokensRouter = require('./routes/tokens');

// Use your routes
app.use('/memes', memesRouter);
app.use('/tokens', tokensRouter);

// ... other configurations and route handlers

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
