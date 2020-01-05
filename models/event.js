/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const notEmpty = (dates) => {
  if (dates.length === 0) {
    return false;
  }
  return true;
};

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dates: Array,
  votes: [{
    date: String,
    people: Array,
  }],
  participants: Array,
});

eventSchema.path('dates').validate(notEmpty, 'atleast one date is required');

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.votes.forEach((obj) => {
      delete obj._id;
    });
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.participants;
  },
});

module.exports = mongoose.model('Event', eventSchema);
