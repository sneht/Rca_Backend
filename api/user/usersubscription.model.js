const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSubscriptionSchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref:"users",
        required: true,
        trim: true,
    },
    sub_id:{
        type: mongoose.Types.ObjectId,
        ref:"subscription",
        required: true,
        trim: true,
    },
    start_date:{
        type: Date,
        required: true,
        trim: true,
    },
    end_date:{
        type: Date,
        trim: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
  }, {
    timestamps: true
});
  const UserSubscription = mongoose.model('usersubscription', UserSubscriptionSchema);
  module.exports = UserSubscription;