const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');

exports.calculation = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                id: Joi.objectId().required()
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
        customLogger.error("error api/calculation/calculation.validator.js  calculation ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}
