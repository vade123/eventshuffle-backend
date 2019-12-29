const eventRouter = require('express').Router();
const Event = require('../models/event');

eventRouter.post('/', (req, res) => {
  const event = new Event({
    name: req.body.name,
    dates: req.body.dates,
    votes: [],
  });
  event
    .save()
    .then((result) => {
      res.status(201).json({ id: result.id });
    });
});

module.exports = eventRouter;
