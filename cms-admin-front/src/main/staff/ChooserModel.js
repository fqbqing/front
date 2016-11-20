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
    function StaffChooserModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listStaff;
    }


    /**
     * @inheritDoc
     */
    StaffChooserModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // StaffChooserModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    StaffChooserModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 10
    };


    // return模块
    require('er/util').inherits(StaffChooserModel, ListModel);
    return StaffChooserModel;
});
