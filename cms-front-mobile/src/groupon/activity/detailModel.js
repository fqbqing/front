/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var api = require('common/config').api;
    var consts = require('common/constants');
    var user = require('common/user');

    var exports = {};

    exports.datasource = {
        groupon: function (query) {
            return api.getGrouponById({
                id: query.id
            });
        },
        signupStatistics: function (query) {
            return api.grouponSignupStatistics({
                id: query.id
            });
        },
        channels: function (query) {
            return api.grouponChannelStatistics({
                id: query.id
            });
        },
        shareLink: function (query) {
            return consts.C_URL + '/activity/groupon/'+ query.id +'.html?source=' + user.userInfo.source;
        }
    };

    return exports;
});
