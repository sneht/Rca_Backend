const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    type:{
        type: String,
        required: true,
        trim: true,
        enum: ["GOLD", "PLATINUM", "STANDARD"],
    },
    price:{
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: Array,
        required: true,
        trim: true,
    },
    duration:{
        type: String,
        required: true,
        trim: true,
        enum: ["MONTHLY", "QUARTERLY", "YEARLY"],
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
  }, {
    timestamps: true
});
  const Subscription = mongoose.model('subscription', SubscriptionSchema);
  module.exports = Subscription;