const Subscription = require('./subscription.model')
const userSunscriptionModel = require('../user/usersubscription.model')
const { commonMessage, userMessage, subscriptionMessage } = require("../../config/actionMessage");
const customLogger = require("../../shared/helpers/customLogger");

exports.create = async (data) => {
    try {
      const SubsriptionData = await Subscription.findOne({ type: data.type.trim() });
      if (SubsriptionData != null) {
        return {
          success: false,
          message: subscriptionMessage.subscriptionExist,
          data: SubsriptionData,
        };
      }else{

          const datum = new Subscription(data);
          const result = await datum.save();
          
          return {
              success: true,
              message: subscriptionMessage.subscriptionCreate,
              data: result,
            };
    }
    } catch (error) {
      customLogger.error("error api/subscription/subscription.service.js  Create ==>", error);
      return {
        success: false,
        message: "ERROR_ADDING_SUBSCRIPTION_DETAILS",
        data: error.message,
      };
    }
  };


  exports.Exists = async (data) => {
    try {
      const Subscriptiondata = await Subscription.findOne({ _id: data });
      if(!Subscriptiondata) {
        return commonResponse.send(res, req.languageCode, 'Subscription Data Not Found', 400, {});
      }
      return { success: true, message: "Message Successfully", data: Subscriptiondata };
    } catch (error) {
      return {
        success: false,
        message: "ERROR_FETCHING_SUBSCRIPTION_DETAILS",
        data: error.message,
      };
    }
  };

  exports.list = async (where) => {
    try {
        const datum = await Subscription.find(where? where: {})
        return { success: true, message: userMessage.userList, data: datum };
    } catch (error) {
      return {
        success: false,
        message: "ERROR_FETCHING_SUBSCRIPTION_LIST",
        data: error.message,
      };
    }
  };

  exports.update = async (where, data) => {
    try {
      var Arr = where.toString().split(",");
      var myquery = { _id: Arr };
      var newvalues = { $set:  data  };
      const SubscriptionData = await Subscription.updateMany(myquery, newvalues);
      return { success: true, message: subscriptionMessage.subscriptionUpdate, data: SubscriptionData };
    } catch (error) {
      return {
        success: false,
        message: "ERROR_UPDATING_SUBSCRIPTION",
        data: error.message,
      };
    }
  };

  exports.get = async (where) => {
    try {
        const datum = await userSunscriptionModel.findOne(where? where: {})
        if (datum != null) {
          return { success: true, message: subscriptionMessage.subscriptionExist, data: datum };
        }else{
        return { success: true, message: "User Subscription not available", data: datum };
        }
    } catch (error) {
      return {
        success: false,
        message: "ERROR_FETCHING_SUBSCRIPTION_LIST",
        data: error.message,
      };
    }
  };