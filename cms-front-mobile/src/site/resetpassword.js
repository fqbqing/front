/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.view = require('./resetpasswordView');

    exports.model = require('./resetpasswordModel');

    exports.events = {
        'view:RESET_PASSWORD': function (phone, verifyCode, password) {
            var me = this;
            this.model.resetPassword({
                phone: phone,
                verifyCode: verifyCode,
                newPassword: password
            }).then(function () {
                me.router.reset('/login');
            });
        }
    };

    return exports;
});
