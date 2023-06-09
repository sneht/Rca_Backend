const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calculationSchema = Schema({
    location:{
        type: String
    },
    index: {
        type: Number
    },
    location:{
        type: String
    },
    range: {
        type: String
    },
    sample: {
        type: Number
    },
    standardDeviation: {
        type: Number
    },
    type: {
        type: String
    }
}
);
  const Calculation = mongoose.model('location', calculationSchema);
  module.exports = Calculation;