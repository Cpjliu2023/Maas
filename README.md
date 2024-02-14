# Meme as a Service (MaaS) API

## Introduction

Meme as a Service (MaaS) is an API product that allows users to fetch memes using a simple API call. It supports parameters such as latitude, longitude, and query for a customized meme experience. This project only focuses on getting memes and check token balances. It relies on a third-party service to generate user tokens and make api calls to store tokens in storage this service has access to.

## How to Run
Install dependencies: npm install
Start the server: npm start

## Microservice Implementation
The MaaS API is implemented using Node.js and Express.js. The core functionality is to generate and serve memes based on user queries and location parameters.

## API Documentation

### Get Memes

Endpoint: `GET /memes`

#### Parameters

- `lat`: Latitude of the location (optional)
- `lon`: Longitude of the location (optional)
- `query`: Free text query for meme relevance (optional)

Example:

GET /memes?lat=40.730610&lon=-73.935242&query=food

This API call returns a meme relevant to the query 'food' in the specified location.

**Token Authentication:**
- Clients must include an `auth-token` in the request header.
- The token is authenticated to ensure valid access.

**Token Usage:**
- Each successful API call increments the client's `apiCalls` count.
- The token balance decreases with each API call.

**Token Expiration:**
- When the token balance is insufficient, the client receives a `403` error with an `ACCESS_DENIED` code.

## Token System

Clients can purchase tokens to make API calls. The system tracks the number of API calls made by each client and provides real-time token balance.

#### Endpoints

1. Get Token Balance

   Endpoint: `GET /tokens/balance`

   Example:
   GET /tokens/balance

This API call retrieves the current token balance for the authenticated client.

## Token Authentication:

Clients must include an auth-token in the request header.
The token is authenticated to ensure valid access.

## Token Expiration:
When the token balance is insufficient, the client receives a 403 error with an ACCESS_DENIED code.

## Token Management
A third-party service is responsible for adding tokens and creating tokens.

Current tokens are stored in a local clientData.json.
In the production stage, a scalable database will replace the local storage for improved performance and reliability.

## Testing
The project includes Jest for unit testing. Run tests using:
    npm test