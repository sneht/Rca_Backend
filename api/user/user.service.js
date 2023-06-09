const Users = require("./user.model");
const UserSubscription = require('./usersubscription.model')
const subscriptionService = require('../subscription/subscription.service')
const { commonMessage, userMessage } = require("../../config/actionMessage");
const pagination = require("../../shared/helpers/pagination");
const { email } = require("../../shared/helpers");
const customLogger = require("../../shared/helpers/customLogger");
const bcrypt = require("bcryptjs");
const config = require("../../config/config");
const { Subscription } = require("../subscription/subscription.validator");
const moment = require("moment");

exports.Exists = async (where) => {
  try {
    const user = await Users.findOne(where);
    if(user !== null) {
      return { success: true, message: commonMessage.message, data: user };
    } else {
      return { success: false, message: userMessage.userError, data: null };
    }
  } catch (error) {
    customLogger.error("error api/user/user.service.js  Exists ==>", error);
    return {
      success: false,
      message: userMessage.userError,
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const existUser = await Users.findOne({ email: data.email.trim() });
    if (existUser != null) {
      return {
        success: false,
        message: userMessage.userExist,
        data: existUser,
      };
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(String(data.password), salt);
    data.password = encryptedPassword;
    const datum = new Users(data);
    const result = await datum.save();

    const { successMail, messageMail } = await email.sendForVerify(result);
    if (successMail) {
      return {
        success: true,
        message: userMessage.userCreate,
        data: result,
      };
    } else {
      await Users.findByIdAndDelete(result._id);
      return {
        success: false, 
        message: messageMail,
        data: "",
      };
    }
  } catch (error) {
    customLogger.error("error api/user/user.service.js  Create ==>", error);
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Users, where, datum, ["role"]);
    if (data.success === true) {
      return { success: true, message: userMessage.userList, data: data };
    } else {
      return {
        success: false,
        message: "ERROR_FETCHING_USERS_LIST",
        data: data,
      };
    }
  } catch (error) {
    customLogger.error("error api/user/user.service.js  List ==>", error);
    return {
      success: false,
      message: "ERROR_FETCHING_USERS_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(",");
    var myquery = { _id: Arr };
    var newvalues = { $set: data };
    const User = await Users.updateMany(myquery, newvalues);
    return {
      success: true,
      message: userMessage.userUpdate,
      data: User,
    };
  } catch (error) {
    customLogger.error("error api/user/user.service.js  Update ==>", error);
    return {
      success: false,
      message: "ERROR_UPDATING_USER",
      data: error.message,
    };
  }
};

exports.usersubscription = async (data) => {
  try {

    Subscriptiondata = await subscriptionService.Exists(data.sub_id);
    const startdate = moment(data.start_date).format('DD-MM-YYYY')
    let end_date;
    switch(Subscriptiondata.data?.duration) {
      case 'MONTHLY':
        end_date = moment(startdate).add(1, 'M').format('DD-MM-YYYY');
      break;
      case 'QUARTERLY':
        end_date = moment(startdate).add(3, 'M').format('DD-MM-YYYY');
      break;
      case 'YEARLY':
        end_date = moment(startdate).add(1, 'Y').format('DD-MM-YYYY');
      break;
    };

    const maindata = {
      "user_id": data.user_id,
      "sub_id": data.sub_id,
      "start_date": data.start_date,
      "end_date": end_date
  };

    const datum = new UserSubscription(maindata);
    const result = await datum.save();


      return {
        success: true,
        message: userMessage.userSubscriptionadd,
        data: result,
      };
      
  } catch (error) {
    customLogger.error("error api/user/user.service.js  usersubscription ==>", error);
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};
