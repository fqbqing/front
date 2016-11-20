/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var $ = require('jquery');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listOrganization;
    }


    /**
     * @inheritDoc
     */
    OrganizationListModel.prototype.datasource = {
        brands: function () {
            return api.listBrand();
        },
        provinceData: function (model) {
            return api.locationTree().then(function (data) {
                return data.children;
            });
        },
        exportUrl: function (model) {
            var param = {};
            if(model.get('province_id')){
                param.province_id = model.get('province_id');
            }
            if(model.get('brand_id')){
                param.brand_id = model.get('brand_id').split(',');
            }
            return $.param(param);
        },
        initialData: function (model) {
            var brand_id = [];
            if (model.get('brand_id')) {
                brand_id = model.get('brand_id').split(',');
            }
            return brand_id;
        }
    };

    /**
     * @inheritDoc
     */
    // OrganizationListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    OrganizationListModel.prototype.prepareQuery = function (query) {
        if (query.brand_id) {
            query.brand_id = query.brand_id.split(',');
        }
        return query;
    };


    // return模块
    require('er/util').inherits(OrganizationListModel, ListModel);
    return OrganizationListModel;
});
