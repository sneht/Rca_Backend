const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');

exports.editprofile = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                id: Joi.objectId().required(),
                name: Joi.string().required(),
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
        customLogger.error("error api/user/user.validator.js  edit profile ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}

exports.changepassword = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                id: Joi.objectId().required(),
                oldpassword: Joi.string().min(6).max(18).required(),
                password: Joi.string().min(6).max(18).required(),
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
        customLogger.error("error api/user/user.validation.js  changepassword ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}
exports.usersubscription = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                user_id: Joi.objectId().required(),
                sub_id: Joi.objectId().required(),
                start_date: Joi.date().required()
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
        customLogger.error("error api/user/user.validation.js  usersubscription ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}