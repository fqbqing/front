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
    function GoodCategoryListModel() {
        ListModel.apply(this, arguments);
        // 列表请求器 (*)
        this.listRequester = api.listCategory;
    }


    /**
     * @inheritDoc
     */
    GoodCategoryListModel.prototype.datasource = {

    };

    /**
     * @inheritDoc
     */
    GoodCategoryListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    GoodCategoryListModel.prototype.addCategory = function (cate) {
        return api.addCategory(cate);
    };

    GoodCategoryListModel.prototype.updateCategory = function (cate) {
        return api.updateCategory(cate);
    };

    GoodCategoryListModel.prototype.deleteCategory = function (ids) {
        return api.deleteCategory({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(GoodCategoryListModel, ListModel);
    return GoodCategoryListModel;
});
