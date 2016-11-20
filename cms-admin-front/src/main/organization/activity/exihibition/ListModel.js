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
    function OrganizationActivityExihibitionListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listExhibition;
    }


    /**
     * @inheritDoc
     */
    OrganizationActivityExihibitionListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // OrganizationActivityExihibitionListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationActivityExihibitionListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    OrganizationActivityExihibitionListModel.prototype.getExtraQuery = function () {
        return {
            organization_id: this.get('organization_id')
        };
    };

    // return模块
    require('er/util').inherits(OrganizationActivityExihibitionListModel, ListModel);
    return OrganizationActivityExihibitionListModel;
});
