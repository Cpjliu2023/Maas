const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/clientData.json');

function readDataFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or there's an error reading, return an empty object
    return {};
  }
}

function writeDataFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error);
  }
}

// Middleware for standard API calls
function standardMiddleware(req, res, next) {
  const authToken = req.headers['auth-token'];
  let clientData = readDataFile();

  if (!clientData.hasOwnProperty(authToken)) {
    return res.status(403).json({ error: 'Permission Denied', code: 'ACCESS_DENIED' });
  }

  const userApiCalls = clientData[authToken].apiCalls;
  const userTokens = clientData[authToken].tokens;

  if (userApiCalls >= userTokens) {
    return res.status(403).json({ error: 'No tokens left', code: 'NO_TOKENS_LEFT' });
  }

  clientData[authToken].apiCalls += 1;

  // Update the data file with the modified clientData
  writeDataFile(clientData);

  next();
}

// Middleware for /tokens/balance API call
function balanceMiddleware(req, res, next) {
  const authToken = req.headers['auth-token'];
  let clientData = readDataFile();

  if (!clientData.hasOwnProperty(authToken)) {
    return res.status(403).json({ error: 'Permission Denied', code: 'ACCESS_DENIED' });
  }

  // Skip incrementing apiCalls count for /tokens/balance API call

  // Do not update the data file

  next();
}

module.exports = {
  readDataFile,
  writeDataFile,
  standardMiddleware,
  balanceMiddleware,
};
