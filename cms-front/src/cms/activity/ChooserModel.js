/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var u = require('underscore');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function ActivityChooserModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listActivity;
    }


    /**
     * @inheritDoc
     */
    ActivityChooserModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // ActivityChooserModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ActivityChooserModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 10
    };


    // return模块
    require('er/util').inherits(ActivityChooserModel, ListModel);
    return ActivityChooserModel;
});
