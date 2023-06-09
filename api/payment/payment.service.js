const Payment = require('./payment.model')
const { commonMessage, userMessage, subscriptionMessage } = require("../../config/actionMessage");
const customLogger = require("../../shared/helpers/customLogger");
const userService = require('../../api/user/user.service')

exports.create = async (dataa) => {
    try {
      const datum = new Payment(dataa);
      const result = await datum.save();
      let {success, message, data} = await userService.usersubscription(dataa);
      if(success){
        return {
          success: true,
          message: "Payment Added Successfully",
          data: result,
        };
      }else{
        return {
          success: false,
          message: "Error While Adding Payment Details",
          data: result,
        };
      }
          
    } catch (error) {
      customLogger.error("error api/subscription/subscription.service.js  Create ==>", error);
      return {
        success: false,
        message: "ERROR_ADDING_PAYMENT_DETAILS",
        data: error.message,
      };
    }
  };



  exports.list = async (where) => {
    try {
        const datum = await Payment.find(where? where: {})
        return { success: true, message: userMessage.userList, data: datum };
    } catch (error) {
      return {
        success: false,
        message: "ERROR_FETCHING_PAYMENT_LIST",
        data: error.message,
      };
    }
  };
