const router = require('express').Router();
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');
const paymentService = require('./payment.service')
const paymentValidator = require('./payment.validator')
const { validUser } = require('../../shared/helpers/guard');

router.post("/", validUser, paymentValidator.Payment, async (req, res )=>{
    try{
        let {success, message, data} = await paymentService.create(req.body);
        if(success){
            return commonResponse.success(res, data, req.languageCode, message)
        }else{
            return commonResponse.notFound(res, req.languageCode, message)
        }
    }catch(error){
        customLogger.error("error api/subscription/subscription.controller.js  post-create ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
})

router.post("/list", validUser, async (req, res )=>{
    try{
        let {success, message, data} = await paymentService.list(req.body.where);
        if(success){
            return commonResponse.success(res, data, req.languageCode, message)
        }else{
            return commonResponse.notFound(res, req.languageCode, message)
        }
    }catch(error){
        customLogger.error("error api/subscription/subscription.controller.js  post-create ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
})

module.exports = router