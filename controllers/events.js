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
    participants: [],
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
        const newEvent = event;
        votes.forEach((date) => {
          const pos = newEvent.votes.findIndex((obj) => obj.date === date);
          if (pos === -1) {
            newEvent.votes = newEvent.votes.concat({ date, people: [name] });
          } else {
            newEvent.votes[pos].people = newEvent.votes[pos].people.concat(name);
          }
        });
        if (!event.participants.includes(name)) {
          newEvent.participants = newEvent.participants.concat(name);
        }
        Event.findByIdAndUpdate(id, newEvent, { new: true })
          .then((updatedEvent) => {
            res.json(updatedEvent.toJSON());
          })
          .catch((error) => next(error));
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = eventRouter;
