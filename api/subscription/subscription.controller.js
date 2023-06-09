const router = require('express').Router();
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');
const subscriptionService = require('./subscription.service')
const subscriptionValidator = require('./subscription.validator')
const { validUser } = require('../../shared/helpers/guard');

router.post("/", validUser, subscriptionValidator.Subscription, async (req, res )=>{
    try{
        let {success, message, data} = await subscriptionService.create(req.body);
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
        let {success, message, data} = await subscriptionService.list(req.body.where);
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

router.put('/:id', subscriptionValidator.id, subscriptionValidator.Subscription, async (req, res) => {
    const {success, message, data} = await subscriptionService.update( req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: message,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: message,
            data: data
        })
    }

})


router.delete('/:id', subscriptionValidator.id, async (req, res) => {
    const {success, message, data} = await subscriptionService.update( req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: message,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: message,
            data: data
        })
    }

})

router.get("/get", validUser,subscriptionValidator.get, async (req, res )=>{
    try{
        let {success, message, data} = await subscriptionService.get(req.body);
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