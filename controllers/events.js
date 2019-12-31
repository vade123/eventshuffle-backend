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
    .then((event) => {
      if (event) {
        res.json(event.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

eventRouter.post('/:id/vote', (req, res, next) => {
  const { id } = req.params;
  const { name, votes } = req.body;
  Event.findById(id)
    .then((event) => {
      if (event) {
        votes.forEach((date) => {
          const pos = event.votes.findIndex((obj) => obj.date === date);
          if (pos === -1) {
            event.votes.push({ date, people: [name] });
          } else {
            event.votes[pos].people.push(name);
          }
        });
        Event.findByIdAndUpdate(id, event, { new: true })
          .then((updatedEvent) => {
            res.json(updatedEvent.toJSON());
          })
          .catch((error) => next(error));
      } else {
        res.status(404).end();
      }
    });
});

module.exports = eventRouter;
