const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');

const app = express();

console.log('Connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to mongoDB:', error.message);
    console.log('Server shutting down');
    process.exit(1);
  });

module.exports = app;
