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
    function GoodProductListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listProduct;
    }


    /**
     * @inheritDoc
     */
    GoodProductListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // GoodProductListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GoodProductListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    GoodProductListModel.prototype.deleteProduct = function (ids) {
        return api.deleteProduct({
            id: ids
        });
    };

    GoodProductListModel.prototype.updateProduct = function (data) {
        return api.updateProduct(data);
    };

    // return模块
    require('er/util').inherits(GoodProductListModel, ListModel);
    return GoodProductListModel;
});
