/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var user = require('bat-ria/system/user');
    var constants = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OverviewIndexModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OverviewIndexModel.prototype.datasource = {
        //user: function () {
        //    return user.visitor;
        //},
        //summary: function () {
        //    return api.statSummary();
        //},
        tuans: function (model) {
            var param = {
                status: constants.ACTIVITY_STATUS_ONLINE, // 已上线
                pageNo: 1,
                pageSize: 6
            };
            return api.listTuan(param, {
                silent: true
            }).then(function (page) {
                return page.data;
            }, function () {
                return [];
            });
        },
        groupons: function () {
            var param = {
                status: constants.ACTIVITY_STATUS_ONLINE, // 已上线
                pageNo: 1,
                pageSize: 6
            };
            return api.listGroupon(param, {
                silent: true
            }).then(function (page) {
                return page.data;
            }, function () {
                return [];
            });
        },
        exhibitions: function (model) {
            var param = {
                order: 'desc',
                pageSize: 6
            };
            return api.listExhibition(param, {
                silent: true
            }).then(function (page) {
                return page.data;
            }, function () {
                return [];
            });
        },
        vouchers: function (model) {
            var param = {
                status: constants.ACTIVITY_STATUS_ONLINE, // 已上线
                order: 'desc',
                pageSize: 6
            };
            return api.listVoucherActivity(param, {
                silent: true
            }).then(function (page) {
                return page.data;
            }, function () {
                return [];
            });
        },
        constants: function () {
            return constants;
        }

    };


    // return模块
    require('er/util').inherits(OverviewIndexModel, BaseModel);
    return OverviewIndexModel;
});
