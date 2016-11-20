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
    function GoodTagListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listTag;
    }


    /**
     * @inheritDoc
     */
    GoodTagListModel.prototype.datasource = {

    };

    /**
     * @inheritDoc
     */
    // GoodTagListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GoodTagListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    GoodTagListModel.prototype.deleteTag = function (ids) {
        return api.deleteTag({
            id: ids
        });
    };

    GoodTagListModel.prototype.addTag = function (name) {
        return api.addTag({
            name: name
        });
    };

    GoodTagListModel.prototype.updateTag = function (tag) {
        return api.updateTag({
            id: tag.id,
            name: tag.name
        });
    };


    // return模块
    require('er/util').inherits(GoodTagListModel, ListModel);
    return GoodTagListModel;
});
