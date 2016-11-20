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
    function OrganizationStatisticsIndexModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OrganizationStatisticsIndexModel.prototype.datasource = {
        user: function () {
            return user.visitor;
        },
        stat: function (model) {
            return api.listOrganizationStatistics({
                organizationId: model.get('organization_id')
            });
        },
        kpiList: function () {
            return require('./config').kpiList;
        },
        kpi: function (model) {
            return api.listOrganizationKPI({
                organizationId: model.get('organization_id'),
                endDate: moment().format('YYYY-MM-DD'),
                startDate: moment().subtract(6, 'd').format('YYYY-MM-DD')
            });
        }
    };

    OrganizationStatisticsIndexModel.prototype.loadKpi = function (time) {
        return api.listOrganizationKPI({
            organizationId: this.get('organization_id'),
            endDate: moment(time.end).format('YYYY-MM-DD'),
            startDate: moment(time.start).format('YYYY-MM-DD')
        });
    };


    // return模块
    require('er/util').inherits(OrganizationStatisticsIndexModel, BaseModel);
    return OrganizationStatisticsIndexModel;
});
