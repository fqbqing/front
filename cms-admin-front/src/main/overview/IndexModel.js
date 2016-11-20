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

    var moment = require('moment');

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
        user: function () {
            return user.visitor;
        },
        stat: function () {
            return api.listOrganizationStatistics();
        },
        kpiList: function () {
            return require('./config').kpiList;
        },
        kpi: function () {
            return api.listOrganizationKPI({
                endDate: moment().format('YYYY-MM-DD'),
                startDate: moment().subtract(6, 'd').format('YYYY-MM-DD')
            });
        }
    };

    OverviewIndexModel.prototype.loadKpi = function (time) {
        return api.listOrganizationKPI({
            endDate: moment(time.end).format('YYYY-MM-DD'),
            startDate: moment(time.start).format('YYYY-MM-DD')
        });
    };


    // return模块
    require('er/util').inherits(OverviewIndexModel, BaseModel);
    return OverviewIndexModel;
});
