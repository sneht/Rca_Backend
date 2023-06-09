exports.info = (title, message) => {
    if(process.env.DEBUG)
    {
        console.log(title + message);
        logger.error(title, message);
    }
};

exports.error = (title, message) => {
    console.error(title + message.stack || message);
    logger.error(title, message.stack || message);
};