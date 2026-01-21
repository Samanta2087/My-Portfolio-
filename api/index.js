const express = require('express');
const path = require('path');

// Create a simple Express app that serves the built files
const app = express();

// Import the built server
const serverModule = require('../dist/index.cjs');

// Export the app for Vercel
module.exports = serverModule.default || serverModule.app || serverModule;
