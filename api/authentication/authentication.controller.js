const express = require("express");
const { userMessage } = require("../../config/actionMessage");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const CONFIG = require("../../config/config")
const router = express.Router();
const { commonResponse } = require("../../shared/helpers");
const emaill = require("../../shared/helpers/email")
const customLogger = require("../../shared/helpers/customLogger");

const UserService = require("../user/user.service");
const authorizationValidator = require('./authorization.validator');
const moment = require('moment')

router.post("/signup", authorizationValidator.signup, async (req, res) => {
  try {
    const { success, message } = await UserService.create(req.body);
    if (success) {  
      commonResponse.success(res, null, req.languageCode, message);
    } else {
      commonResponse.keyAlreadyExist(res, null, req.languageCode, message);
    }
  } catch (error) {
    customLogger.error("error api/authentication/authentication.controller.js  /signup ==>", error);
    commonResponse.sendUnexpected(res, error, req.languageCode, error);
  }
});

router.get("/verify/:id", authorizationValidator.verify, async (req, res) => {
  try {
    const existingUser = await UserService.Exists({_id: req.params.id})
    console.log(existingUser);
    if(existingUser.success) {
      const { success, message, data } = await UserService.update(req.params.id, { "isVerified": true});
      if (success) {
        commonResponse.success(res, data, req.languageCode, message);
      } else {
        commonResponse.keyAlreadyExist(res, data, req.languageCode, message);
      }
    } else {
      commonResponse.keyAlreadyExist(res, existingUser.message, req.languageCode, existingUser.message);
    }
  } catch (error) {
    customLogger.error("error api/authentication/authentication.controller.js  /verify/:id ==>", error);
    commonResponse.sendUnexpected(res, error, req.languageCode, error);
  }
});

router.post("/signin", authorizationValidator.signIn, async (req, res) => {
  try {
    const {email, password} = req.body;
    let {success, message,  data} = await UserService.Exists({ email: email.trim() });
    if (!success) {
      return commonResponse.notFound(res, req.languageCode, userMessage.userNotFound)
    }
    if( !data.isVerified ){
      return commonResponse.send(res, req.languageCode, userMessage.usetNotVerified, 400)
    }
    
    const passwordCompare = await bcrypt.compare(password, data.password);
    if (!passwordCompare) {
     return commonResponse.unAuthentication(res, null,  req.languageCode, userMessage.userPasswordNotMatch)
    }
    const datam = { user: { id: data._id }};
    const authtoken = jwt.sign(datam, CONFIG.jwt.JWTSECRET);
    // const refreshtoken = jwt.sign(datam, CONFIG.jwt.JWTSECRET, { expiresIn: CONFIG.jwt.JWTREFRESHEXPIRY });
    // await UserService.update(data._id,  {refreshToken:  refreshtoken});
  
    const signindata = { ...data._doc, token : authtoken}
    return commonResponse.success(res, signindata, req.languageCode, userMessage.userlogin)
  //   res.status(200).send({
  //     success: success,
  //     message:  userMessage.userlogin,
  //     data: data,
  //     token: authtoken 
  // })
  } catch (error) {
    customLogger.error("error api/authentication/authentication.controller.js  /signin ==>", error);
    return commonResponse.sendUnexpected(res, error, req.languageCode, error);
  }
});

router.post("/forgot", authorizationValidator.forgot, async (req, res) => {
  try {
    const {email, password} = req.body;
    const {success, message, data} = await UserService.Exists({ email: email.trim(), isVerified: true });
    if(success){
      const otp = Math.floor(100000 + Math.random() * 900000);

      const { successMail, messageMail } = await emaill.sendForForgotPassword(data, otp);
      if(successMail){
        const updateUser = await UserService.update(data._id, {otp : otp});
        if(success){
          return commonResponse.success(res, {id : data._id}, req.languageCode, userMessage.userOTP)
        }else{
          return commonResponse.sendUnexpected(res, updateUser.data, req.languageCode, updateUser.message);
        }
      }else{
        return commonResponse.sendUnexpected(res, messageMail, req.languageCode, messageMail)
      }
    }else{
      return commonResponse.notFound(res, res.languageCode, message)
    }
  } catch (error) {
    customLogger.error("error api/authentication/authentication.controller.js  /forgot ==>", error);
    return commonResponse.sendUnexpected(res, error, req.languageCode, error);
  }
});

router.post("/otpverify", authorizationValidator.otpverify, async (req, res) => {
  try{
    const { id , otp} = req.body;
    const {success, message, data} = await UserService.Exists({ _id :  id , otp : otp});
    if (success){
      const timeDiff = moment(new Date).diff(moment(data.updatedAt), 'minutes');
      if(timeDiff > CONFIG.OTP_EXPIRY) {
        const updateotp = await UserService.update(id, {otp : null})
        return commonResponse.send(res, req.languageCode, userMessage.userOTPexpiry, 400);  
      }
      const updateotp = await UserService.update(id, {otp : null})
      return commonResponse.success(res, {id : id }, req.languageCode, userMessage.userOTPverify)
    }else{
      return commonResponse.notFound( res, req.languageCode, message )
    }
  }catch(error){
    customLogger.error("error api/authentication/authentication.controller.js  /otpverify ==>", error);
    return commonResponse.sendUnexpected(res, error, req.languageCode, error);
  }
})

router.post("/updatepassword", authorizationValidator.updatepassword, async (req, res)=>{
  try{
    const {id , password} =req.body;

    const { success, message, data } = await UserService.Exists({ _id : id});
    if(success){
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(String(password), salt);
      const updatedpassword = await UserService.update(id, { password : encryptedPassword})
      return commonResponse.success(res, null, req.languageCode,  userMessage.userPasswordUpdate)
    }else{
      return commonResponse.notFound(res, req.languageCode, message)
    }
  }catch(error){
    customLogger.error("error api/authentication/authentication.controller.js  /updatepassword ==>", error);
    return commonResponse.sendUnexpected(res, error, req.languageCode, error);
  }
})

module.exports = router;
