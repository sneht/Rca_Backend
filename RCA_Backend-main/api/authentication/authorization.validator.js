const Joi = require('joi');
const { min } = require('lodash');
Joi.objectId = require('joi-objectid')(Joi);
const { commonResponse } = require('../../shared/helpers')
const customLogger = require('../../shared/helpers/customLogger')

exports.signup = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().max(50).email({ minDomainSegments: 2 }).required(),
                password: Joi.string().min(6).max(18).required()
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
    } catch(error) {
        customLogger.error("error api/authentication/authentication.validator.js  signup ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error);
    }
}
exports.verify = (req, res, next) => {
    try {
            const schema = Joi.object().keys({
                id:  Joi.objectId().required(),
            })

            let data = schema.validate(req.params);
            if(data.hasOwnProperty('error')) {
                commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
            } else {
                next();
            }
    } catch(error) {
        customLogger.error("error api/authentication/authentication.validator.js  verify ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error);
    }
}

exports.signIn = (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().max(50).email({ minDomainSegments: 2 }).required(),
            password: Joi.string().max(15).required()
        });
        let data = schema.validate(req.body);

        if(data.hasOwnProperty('error')) {
           return commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
        } else {
            next();
        }
    } catch(error) {
        customLogger.error("error api/authentication/authentication.validator.js  signin ==>", error);
		return commonResponse.sendUnexpected(res, error, req.languageCode, error);
    }
}

exports.forgot = (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().max(50).email({ minDomainSegments: 2 }).required(),
        });
        let data = schema.validate(req.body);

        if(data.hasOwnProperty('error')) {
           return commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
        } else {
            next();
        }
    } catch(error) {
        customLogger.error("error api/authentication/authentication.validator.js  forgot ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error);
    }
}

exports.otpverify = (req, res, next ) =>{
    try{
        const schema = Joi.object().keys({
            id:  Joi.objectId().required(),
            otp: Joi.number().min(6).required()
        });
        let data = schema.validate(req.body);

        if(data.hasOwnProperty('error')) {
           return commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
        } else {
            next();
        }
    }catch(error){
        customLogger.error("error api/authentication/authentication.validator.js  otpverify ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
}
exports.updatepassword = (req, res, next) =>{
    try{

        const schema = Joi.object().keys({
            id: Joi.objectId().required(),
            password: Joi.string().min(6).max(18).required()
        });
        let data = schema.validate(req.body);
        if(data.hasOwnProperty('error')){
            return commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
        }else{
            next();
        }
    }catch(error){
        customLogger.error("error api/authentication/authentication.validator.js  updatepassword ==>", error);
        return commonResponse.unAuthentication(res, error, req.languageCode, error)
    }
}
