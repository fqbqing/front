/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var constants = require('common/constants');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function GrouponDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    GrouponDetailModel.prototype.datasource = {
        groupon: function (model) {
            return api.getGrouponById({
                id: model.get('id')
            });
        },
        signupStatistics: function (model) {
            return api.grouponSignupStatistics({
                id: model.get('id')
            });
        },
        channels: function (model) {
            return api.grouponChannelStatistics({
                id: model.get('id')
            });
        },
        shareLink: function (model) {
            return constants.C_URL + '/activity/groupon/'+ model.get('id') +'.html?source=' + user.visitor.source;
        },
        constants: function () {
            return constants;
        }
    };


    // return模块
    require('er/util').inherits(GrouponDetailModel, BaseModel);
    return GrouponDetailModel;
});
