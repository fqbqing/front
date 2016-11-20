/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
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
    function ActivityGrouponListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listGroupon;
    }


    /**
     * @inheritDoc
     */
    ActivityGrouponListModel.prototype.datasource = {
        name: function (model) {
            if (model.get('name')) {
                return model.get('name');
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
    // ActivityGrouponListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ActivityGrouponListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    ActivityGrouponListModel.prototype.getExtraQuery = function () {
        return {
            organization_id: this.get('organization_id')
        };
    };

    // return模块
    require('er/util').inherits(ActivityGrouponListModel, ListModel);
    return ActivityGrouponListModel;
});
