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

eventRouter.post('/', (req, res, next) => {
  const event = new Event({
    name: req.body.name,
    dates: req.body.dates,
    votes: [],
  });
  event
    .save()
    .then((result) => {
      res.status(201).json({ id: result.id });
    })
    .catch((error) => next(error));
});

eventRouter.get('/:id', (req, res, next) => {
  Event.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = eventRouter;
