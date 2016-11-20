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
    function GoodSpecificationListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listSpecification;
    }


    /**
     * @inheritDoc
     */
    GoodSpecificationListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // GoodSpecificationListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GoodSpecificationListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    GoodSpecificationListModel.prototype.deleteSpecification = function (ids) {
        return api.deleteSpecification({
            id: ids
        });
    };

    GoodSpecificationListModel.prototype.addSpecification = function (name, type) {
        return api.addSpecification({
            name: name,
            display_type: type
        });
    };

    GoodSpecificationListModel.prototype.updateSpecification = function (tag) {
        return api.updateSpecification({
            id: tag.id,
            name: tag.name
        });
    };


    // return模块
    require('er/util').inherits(GoodSpecificationListModel, ListModel);
    return GoodSpecificationListModel;
});
