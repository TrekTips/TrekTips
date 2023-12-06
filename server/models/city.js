const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thingsToDo: [String],
  thingsNotToDo: [String],
  recommendations: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
});

const City = mongoose.model('City', CitySchema);

module.exports = City;