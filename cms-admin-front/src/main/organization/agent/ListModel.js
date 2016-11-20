/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationAgentListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.agentList;
    }


    /**
     * @inheritDoc
     */
    OrganizationAgentListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // OrganizationAgentListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationAgentListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    OrganizationAgentListModel.prototype.getExtraQuery = function () {
        var param = {};
        if (this.get('organization_id')) {
            param.organization_id = this.get('organization_id');
        }
        return param;
    };

    // return模块
    require('er/util').inherits(OrganizationAgentListModel, ListModel);
    return OrganizationAgentListModel;
});
