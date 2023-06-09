const router = require('express').Router();
const DashboardValidator = require('./dashboard.validator');
const { commonResponse } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');
const summaryService = require('../summary/summary.service')
const { validUser } = require('../../shared/helpers/guard');

router.post("/", validUser, DashboardValidator.dashboard, async (req, res )=>{
    try{
        let {success, message, data} = await summaryService.Exists(req.body.id);
        if(success){
            return commonResponse.success(res, {recentHistory: data}, req.languageCode, message)
        }else{
            return commonResponse.notFound(res, req.languageCode, message)
        }
    }catch(error){
        customLogger.error("error api/dashaboard/dashaboard.controller.js  /dashaboard ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
})

module.exports = router