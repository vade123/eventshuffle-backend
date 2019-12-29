const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./utils/config');
const eventRouter = require('./controllers/events');

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

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/event', eventRouter);

module.exports = app;
