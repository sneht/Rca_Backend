const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SummarySchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
        trim: true,
    },
    location:{
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    asset_class:{
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    option_1:{
        type: String,
        trim: true,
        default: ""
    },
    option_2:{
        type: String,
        trim: true,
        default: ""
    },
    area:{
        type: Number,
        required: true,
        trim: true,
    },
    BCIS_average_prices:{
        type: Number,
        required: true,
        trim: true,
    },
    total_cost_to_construct:{
        type: Number,
        required: true,
        trim: true,
    },
    type:{
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    Aaset_type:{
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    sigma_m2:{
        type: Number,
        required: true,
        trim: true,
    },
    total_cost_of_demolition:{
        type: Number,
        required: true,
        trim: true,
    },
    Grand_Total:{
        type: Number,
        required: true,
        trim: true,
    }
  }, {
    timestamps: true
});
  const Summary = mongoose.model('Summary', SummarySchema);
  module.exports = Summary;