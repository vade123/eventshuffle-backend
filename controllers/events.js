const eventRouter = require('express').Router();
const Event = require('../models/event');

eventRouter.get('/list', (req, res) => {
  Event
    .find({})
    .then((events) => {
      res.json(events.map((event) => {
        const parsedEvent = {
          id: event.id,
          name: event.name,
        };
        return parsedEvent;
      }));
    });
});

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
