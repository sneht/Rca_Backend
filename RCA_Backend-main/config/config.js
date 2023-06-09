module.exports = {
    BASEURL: 'https://rcaapp.onrender.com',
    IS_DISPLAY_LOG: 'IS_DISPLAY_LOG',
    STATIC_ADMIN_USER: 'admin@gmail.com',
    STATIC_ADMIN_PASSWORD: 'qwer@1234',
    BCRYPT_SALT: 10,
    OTP_EXPIRY: 1,
    mogno: {
        MONGO_USERNAME: 'abhipatel',
        MONGO_PASSWORD: 'abhipatel',
        MONGO_DBNAME: 'RCA',
        MONGO_HOST: 'cluster0.m3pri.mongodb.net',
    },
    password: {
        length: 8,
        charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz",
    },
    jwt: {
        JWTSECRET: 'JWTSECRET$RCA#Front@done',
        JWTEXPIRY: '1h',
        JWTREFRESHEXPIRY: '3h'
    },
    email: {
        SMTP: "smtp.zoho.com",
        SMTPSERVICE: "Zoho",
        SMTP_PORT: 587,
        IsSSL: true,
        SENDMAILFROM: "rca.frontendarmy@gmail.com",
        EMAILUSERNAME: "rca.frontendarmy@gmail.com",    
        EMAILPASSWORD: "qhmillothpvxegcm",
        LOGINEMAIL: "admin@gmail.com",
        LOGINPASSWORD: "qwer@1234"
    },
    emailSubject: {
        welcome: 'Welcome to RCA',
        forgotPassword: 'Your OTP to Change the Password | RCA'
    },
}