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
    function StaffListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        // this.listRequester = api.someList;
    }


    /**
     * @inheritDoc
     */
    StaffListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // StaffListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    StaffListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(StaffListModel, ListModel);
    return StaffListModel;
});
