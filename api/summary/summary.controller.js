const router = require('express').Router();
const { commonResponse } = require('../../shared/helpers');
const summaryService = require('./summary.service');
const { summary } = require("../../config/actionMessage");
const { validUser } = require('../../shared/helpers/guard');
const SummaryValidator = require('./summary.validation')

router.post("/",  validUser, SummaryValidator.summarycreate, async (req, res) => {
    const { success, message, data } = await summaryService.create(req.body);
    if (success) {
        return commonResponse.success(res, data, req.languageCode, message)
    } else {
        return commonResponse.send(res, req.languageCode, summary.summaryCreateError, 400)
    }
})


module.exports = router;