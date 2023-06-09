const authorizationController = require('../../api/authentication/authentication.controller');
const userController = require('../../api/user/user.controller')
const dashaboardController = require('../../api/dashboard/dashboard.controller')
const calculationController = require('../../api/calculation/calculation.controller')
const summaryController = require("../../api/summary/summary.controller")
const SubscriptionController = require('../../api/subscription/subscription.controller')
const PaymentController = require('../../api/payment/payment.controller')

const initialize = (app) => {
    app.use('/api/v1/auth', authorizationController);
    app.use('/api/v1/user', userController);
    app.use('/api/v1/dashboard', dashaboardController);
    app.use('/api/v1/calculation', calculationController);
    app.use('/api/v1/summary', summaryController);
    app.use('/api/v1/subscription', SubscriptionController);
    app.use('/api/v1/payment', PaymentController);
}

module.exports = {initialize};