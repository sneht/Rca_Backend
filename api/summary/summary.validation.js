const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');

exports.summarycreate = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                user_id: Joi.objectId().required(),
                location: Joi.string().required(),
                asset_class: Joi.objectId().required(),
                option_1: Joi.any(),
                option_2: Joi.any(),
                area: Joi.number().required(),
                BCIS_average_prices: Joi.number().required(),
                total_cost_to_construct: Joi.number().required(),
                type: Joi.objectId().required(),
                Aaset_type: Joi.objectId().required(),
                sigma_m2: Joi.number().required(),
                total_cost_of_demolition: Joi.number().required(),
                Grand_Total: Joi.number().required()
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
        customLogger.error("error api/summary/summary.validator.js  summarycreate ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}
