/**
 * @file
 * @author ()
 */

define(function (require) {

    var api = require('common/config').api;
    var user = require('common/user');

    var exports = {};

    exports.datasource = {
        user: function () {
            return user.userInfo;
        }
    };

    exports.updatePassword = function (oldPassword, newPassword) {
        return api.updatePassword({
            oldPassword: oldPassword,
            newPassword: newPassword
        }).then(function () {
            user.userInfo.needPasswordChange = false;
        });
    };

    return exports;
});

