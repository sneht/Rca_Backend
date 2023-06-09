const router = require('express').Router();
const { commonResponse } = require('../../shared/helpers');
const calculationService = require('./calculation.service');
const { calculationMessage } = require("../../config/actionMessage");
const { validUser } = require('../../shared/helpers/guard');
const CalculationValidator = require('./calculation.validator')

router.post("/list", validUser,  async (req, res) => {
    const { success, message, locationData_result, asset_class_result, Demolition_Type_result } = await calculationService.list();
    if (success) {
        return commonResponse.success(res, {location_Data: locationData_result, asset_class : asset_class_result, Demolition_Type: Demolition_Type_result}, req.languageCode, "")
    } else {
        return commonResponse.send(res, req.languageCode, calculationMessage.errorFetchData, 400)
    }
});

router.post("/assetclasstype",  validUser, CalculationValidator.calculation, async (req, res) => {
    const { success, message, asset_class_result } = await calculationService.Exists(req.body.id);
    if (success) {
        return commonResponse.success(res, asset_class_result, req.languageCode, message)
    } else {
        return commonResponse.send(res, req.languageCode, calculationMessage.errorFetchData, 400)
    }
})

router.post("/demolitionrate", validUser, CalculationValidator.calculation, async (req, res) => {
    const { success, message, Demolition_Rate_result } = await calculationService.DemolitionExists(req.body.id);
    if (success) {
        return commonResponse.success(res, Demolition_Rate_result, req.languageCode, message)
    } else {
        return commonResponse.send(res, req.languageCode, calculationMessage.errorFetchData, 400)
    }
})

module.exports = router;