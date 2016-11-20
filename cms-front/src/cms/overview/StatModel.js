/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var moment = require('moment');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OverviewStatModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OverviewStatModel.prototype.datasource = {
        stat: function () {
            return api.listOrganizationTotalKPI();
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

    OverviewStatModel.prototype.loadKpi = function (time) {
        return api.listOrganizationKPI({
            endDate: moment(time.end).format('YYYY-MM-DD'),
            startDate: moment(time.start).format('YYYY-MM-DD')
        });
    };


    // return模块
    require('er/util').inherits(OverviewStatModel, BaseModel);
    return OverviewStatModel;
});
