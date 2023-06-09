const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');

exports.Subscription = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                type: Joi.string().required(),
                price: Joi.number().required(),
                description: Joi.array().required(),
                duration: Joi.string().required()
                })
            let data = schema.validate(req.body);
            if(data.hasOwnProperty('error')) {
                commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
            } else {
                next();
            }
        } else {
            commonResponse.notFound(res, req.languageCode, 'BODY NOT FOUND');
        }
    } catch(err) {
        customLogger.error("error api/subscription/subscription.validator.js  Subscription ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}

exports.list = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                type: Joi.string().required(),
                price: Joi.number().required(),
                description: Joi.array().required(),
                duration: Joi.string().required()
                })
            let data = schema.validate(req.body);
            if(data.hasOwnProperty('error')) {
                commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
            } else {
                next();
            }
        } else {
            commonResponse.notFound(res, req.languageCode, 'BODY NOT FOUND');
        }
    } catch(err) {
        customLogger.error("error api/subscription/subscription.validator.js  List ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}

exports.id = (req, res, next) => {
    try{
        if(req.params) {
            const schema = Joi.object().keys({
                id:  Joi.objectId().required(),
            });
            let data = schema.validate(req.params);
            
            if (data.hasOwnProperty('error')) {
                commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
            } else {
                next();
            }
        }else {
            commonResponse.notFound(res, req.languageCode, 'PARAMS NOT FOUND');
        }
	}
	catch (err){
		customLogger.error("error subscription/subscription.validations id ==>", err);
		return commonResponse.sendUnexpected(res, err, req.languageCode);
	}
}


exports.get = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                user_id: Joi.objectId().required(),
                sub_id: Joi.objectId().required()
                })
            let data = schema.validate(req.body);
            if(data.hasOwnProperty('error')) {
                commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
            } else {
                next();
            }
        } else {
            commonResponse.notFound(res, req.languageCode, 'BODY NOT FOUND');
        }
    } catch(err) {
        customLogger.error("error api/subscription/subscription.validator.js  Get ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}