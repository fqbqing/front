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
    function OrganizationActivityTuanListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listTuan;
    }


    /**
     * @inheritDoc
     */
    OrganizationActivityTuanListModel.prototype.datasource = {
        title: function (model) {
            if (model.get('title')) {
                return model.get('title');
            }
            else if (model.get('staff_name')) {
                return model.get('staff_name');
            }
            return  '';
        },
        search_type: function (model) {
            return  model.get('staff_name') ? 0 : 1;
        }
    };

    /**
     * @inheritDoc
     */
    // OrganizationActivityTuanListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationActivityTuanListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    OrganizationActivityTuanListModel.prototype.getExtraQuery = function () {
        return {
            organization_id: this.get('organization_id')
        };
    };


    // return模块
    require('er/util').inherits(OrganizationActivityTuanListModel, ListModel);
    return OrganizationActivityTuanListModel;
});
