const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');

exports.Payment = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                user_id: Joi.string().required(),
                sub_id: Joi.string().required(),
                PaymentDetails: Joi.object().required(),
                start_date: Joi.date().required(),
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
        customLogger.error("error api/payment/payment.validator.js  Payment ==>", err);
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
        customLogger.error("error api/payment/payment.validator.js  list ==>", err);
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
	catch (error){
		customLogger.error("error payment/payment.validations id ==>", error);
		return commonResponse.sendUnexpected(res, error, req.languageCode);
	}
}