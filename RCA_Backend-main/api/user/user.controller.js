const router = require('express').Router();
const userValidator = require('./user.validator');
const { commonResponse, email } = require('../../shared/helpers');
const customLogger = require('../../shared/helpers/customLogger');
const UserService = require('./user.service');
const { userMessage } = require("../../config/actionMessage");
const { validUser } = require('../../shared/helpers/guard');
const bcrypt = require("bcryptjs");


router.post("/editprofile", validUser, userValidator.editprofile, async (req, res )=>{
    try{
        const { id, name } = req.body
        let {success, message, data} = await UserService.Exists({ _id: id });
        if(success){
            let editprofile = await UserService.update(id, {name : name})
            if(editprofile.success){
                const existUser = await UserService.Exists({_id: id});
                return commonResponse.success(res, existUser.data, req.languageCode,  userMessage.userUpdate)
            }else{
                return commonResponse.send(res, req.languageCode, editprofile.message, 400 )
            }
        }else{
            return commonResponse.notFound(res, req.languageCode, message )
        }
    }catch(error){
        customLogger.error("error api/user/user.controller.js  /editprofile ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
})

router.post("/changepassword", validUser, userValidator.changepassword, async (req, res)=> {
    try{
        const { id, oldpassword, password } = req.body;
        let { success, message , data } = await UserService.Exists({ _id : id });
        if(success){
            const passwordCompare = await bcrypt.compare(oldpassword, data.password);
            if(passwordCompare){
                const salt = await bcrypt.genSalt(10);
                const encryptedPassword = await bcrypt.hash(String(password), salt);
                let updatepassword = await UserService.update(id , {password : encryptedPassword})
                if(updatepassword.success){
                    const { successMail, messageMail } = await email.sendForpasswordChange(data);
                    return commonResponse.success(res, null, req.languageCode, userMessage.userChangePassword )         
                }else{
                    return commonResponse.send(res, req.languageCode, updatepassword.message, 400)
                }
            }else{
                return commonResponse.send(res, req.languageCode, userMessage.userPasswordNotMatch, 400)
            }

        }else{
            return commonResponse.notFound(res, req.languageCode, message);
        }
    }catch(err){
        customLogger.error("error api/user/user.controller.js  /changepassword ==>", err);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err)
    }
})
// user subscription


router.post("/subscription", validUser, userValidator.usersubscription, async (req, res )=>{
    try{
        let {success, message, data} = await UserService.usersubscription(req.body);
        if(success){
            return commonResponse.success(res, data, req.languageCode, message)
        }else{
            return commonResponse.notFound(res, req.languageCode, message)
        }
    }catch(error){
        customLogger.error("error api/user/user.controller.js  /subscription ==>", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
})

module.exports = router