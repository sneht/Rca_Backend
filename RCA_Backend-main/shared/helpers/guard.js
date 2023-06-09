const jwt = require('jsonwebtoken');
const commonResponse = require('./response');
const moment = require('moment');
const CONFIG = require('../../config/config');
const { errorMessage } = require('../../config/actionMessage');

const createToken = (user) => {
    const payload = {
        _id: user._id,
	    // role: user.roleID
    };
	payload.token = jwt.sign(payload, CONFIG.jwt.JWTSECRET); //, {expiresIn: CONFIG.jwt.JWTEXPIRY}
    return payload;
};

const verifyJWT = (req) => {
    try {
        const token = req.headers.authorization;
        const userInfo = jwt.verify(token, CONFIG.jwt.JWTSECRET);
        req.user = userInfo;
        return true;
    } catch (error) {
        return false;
    }
}

const isExpired = (date) => {
	'use strict';
	try{
		let toDay = moment.utc();
		let expireDate = moment.utc(date);
		return expireDate < toDay;
	}
	catch (e){
		return false
	}
};

const isAuthorized = async (req) => {
    try {
        const isVerify = verifyJWT(req);
	
	    if(!isVerify) throw { };
	    
	    const token = jwt.verify(req.headers.authorization, CONFIG.jwt.JWTSECRET);
	    const expired = isExpired(token.exp);
	    if(!expired) throw { };
	    
	    return true
    }
    catch(e){
	    return false
    }
};

const validateAdmin = async (req, res, next) => {
    try{
        const authorized = await isAuthorized(req);
        if(!authorized)  throw {};
        // if(req.user.role !== role.Admin) throw {};
	    next();
    }
    catch(e){
        commonResponse.unAuthentication(res, {}, req.languageCode, errorMessage.tokenExpired);
    }
};

const validateCustomer = async (req, res, next) => {
    try{
        const authorized = await isAuthorized(req);
        if(!authorized)  throw {};
        // if(req.user.role !== role.Customer ) throw {};
        next();
    }
    catch(e){
        commonResponse.unAuthentication(res, {}, req.languageCode, errorMessage.tokenExpired);
    }
};
 const validUser = async (req, res, next) => {
     try{
        const authorized = await verifyJWT(req);
        if(!authorized)  throw {};
        // if(req.user.role !== role.Customer ) throw {};
        next();
     }catch(err){
         return commonResponse.unAuthentication(res, {}, req.languageCode, errorMessage.tokenExpired)
     }
 }

module.exports = {
    createToken,
    isAuthorized,
    validateAdmin,
    validateCustomer,
    validUser
}