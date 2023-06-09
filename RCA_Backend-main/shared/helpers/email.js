const nodeMailer = require("nodemailer");
const CONFIG = require("../../config/config");
const customLogger = require("./customLogger");

const transporter = nodeMailer.createTransport({
  // host: 'smtp-mail.outlook.com',
  service:"gmail",
  auth: {
    user: CONFIG.email.EMAILUSERNAME,
    pass: CONFIG.email.EMAILPASSWORD
  }
  // host: CONFIG.email.SMTP,    
 
  // port: CONFIG.email.SMTP_PORT,
  // secure: false,
  // auth: {
  //   user: CONFIG.email.EMAILUSERNAME,
  //   pass: CONFIG.email.EMAILPASSWORD,
  // },
});

module.exports = {
  sendForVerify: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.welcome,
      text: `   
    Hi ${body.name},
        Thank you for choosing us.
        We are warmly welcome to our family
        Please Verify using the link:- ${CONFIG.BASEURL}/api/v1/auth/verify/${body._id}
    Regards,
    RCA
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      console.error('Email Send Error: ', err);
      customLogger.error("error shared/helpers/email sendForVerify==>", err);
      return { success: false, message: err.message };
    }
  },
  sendForForgotPassword: async (body, otp, callback) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.forgotPassword,
      // html: `<b>${otp} </b>`,
      text: `   
    Hi ${body.name},
    Please Verify using the OTP :- ${otp}

    Regards,
    RCA
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      customLogger.error("error shared/helpers/email sendForForgotPassword ==>", err);
      return { successMail: false, messageMail: err.message };
    }
  },
  sendForpasswordChange: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.forgotPassword,
      // html: `<b>${otp} </b>`,
      text: `   
    Hi ${body.name},
    Your Password Changed Successfully

    Regards,
    RCA
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      customLogger.error("error shared/helpers/email  sendForpasswordChange==>", err);
      return { successMail: false, messageMail: err.message };
    }

  },
  sendForAppointmentBookedCustomer: async (body) => {
    let mailOption = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.to,
      subject: CONFIG.emailSubject.appointmentBooking,
      text: `
    Hello ${body.firstName},
    
        You have an appointment on ${body.datetime} with the ${body.outletName} outlet.

    Regrads,
    RCA
            `,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOption);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      customLogger.error("error shared/helpers/email sendForAppointmentBookedCustomer==>", err);
      return { successMail: false, messageMail: err.message };
    }
  },

  sendForAppointmentBookedOutlet: async (body) => {
    let mailOption = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.to,
      subject: CONFIG.emailSubject.appointmentBooking,
      text: `
        Hello ${body.name}, 
    
            You have an appointment on ${body.datetime} with ${body.userName}.
        
        Regrads,
        RCA
            `,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOption);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      customLogger.error("error shared/helpers/email sendForAppointmentBookedOutlet==>", err);
      return { successMail: false, messageMail: err.message };
    }
  },
};
