const resParam = require('./responseMessages/index');

exports.success = (res, data, languageCode = 'en', message = '', statusCode = 200) => {
    const resData = {
        success: true,
        message: message, //resParam.getSuccessResponseMessage(message, languageCode, 'DEFAULT'),
        statusCode: statusCode,
        data,
        messageCode: message
    };
    return res.status(statusCode).send(resData);
};

exports.keyAlreadyExist = (res, err, languageCode = 'en', message = '', statusCode = 409) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: message,// resParam.getSuccessResponseMessage(message, languageCode, 'DEFAULT'),
        data: {},
        error: err,
        messageCode: message
    };
    return res.status(statusCode).send(resData);
};

exports.sendUnexpected = (res, err, languageCode = 'en', message, statusCode = 500) => {

    const resData = {
        success: false,
        statusCode: statusCode,
        message: message, // resParam.getErrResponseMessage(message, languageCode, 'DEFAULT_INTERNAL_SERVER_ERROR'),
        data: err,
        messageCode: message
    };
    return res.status(statusCode).send(resData);
};

exports.sendJoiError = (res, code = '', languageCode = 'en', err, statusCode = 400) => {
    if (is_display_log) {
        console.log('JoiError >>>> ', err);
    }
    let JoiError = _.map(err.details, ({ message, context, type, path }) => ({
        message: message.replace(/['"]/g, ''),
        type,
        path
    }));
    let messageDisplay = resParam.getErrResponseMessage(code, languageCode, 'DEFAULTERR');
    if (JoiError && JoiError.length > 0 && JoiError[0].message) {
        messageDisplay = JoiError[0].message;
    }
    let response = {
        success: false,
        statusCode: statusCode,
        message: messageDisplay,
        error: JoiError,
        messageCode: code
    };
    return res.status(statusCode).send(response);
};

exports.notFound = (res, languageCode = 'en', message, statusCode = 404) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: message, // resParam.getErrResponseMessage(message, languageCode, 'DEFAULTERR') || 'Invalid request data',
        data: {},
        messageCode: message
    };
    return res.status(statusCode).send(resData);
};

exports.unAuthentication = (res, data, languageCode = 'en', message = '', statusCode = 401) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: message, //resParam.getErrResponseMessage(message, languageCode, 'DEFAULT_AUTH'),
        data,
        messageCode: 'DEFAULT_AUTH'
    };
    return res.status(statusCode).send(resData);
};

exports.handelError = (res, error, languageCode='en', data = {}) => {
    let response = {
        success: false,
        statusCode: 400,
        data,
        message: message, //resParam.getErrResponseMessage('okj', languageCode, ''),
        messageCode: 'fff'
    };
    return res.status(400).send(response);
};



exports.send = (res, languageCode = 'en', message = '', statusCode = 203, data = {}) => {


    let response = {
        success: false,
        statusCode: statusCode,
        data,
        message: message,
        messageCode: message
    };
    return res.status(statusCode).send(response);
};
