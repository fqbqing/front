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
    function LevelListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listLevel;
    }


    /**
     * @inheritDoc
     */
    LevelListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // LevelListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    LevelListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    LevelListModel.prototype.addLevel = function (name) {
        return api.addLevel({
            name: name
        });
    };

    LevelListModel.prototype.deleteLevel = function (ids) {
        return api.deleteLevel({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(LevelListModel, ListModel);
    return LevelListModel;
});
