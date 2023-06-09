const { object } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id:{
        type: String,
        required: true,
        trim: true,
    },
    sub_id:{
        type: String,
        required: true,
        trim: true
    },
    PaymentDetails:{
        type: Object,
        required: true,
        trim: true,
    },
    start_date: {
        type: Date,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
  }, {
    timestamps: true
});
  const Payment = mongoose.model('payment', PaymentSchema);
  module.exports = Payment;