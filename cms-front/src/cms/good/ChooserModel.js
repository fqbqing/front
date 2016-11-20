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
    function GoodChooserModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listGood;
    }

    /**
     * @inheritDoc
     */
    GoodChooserModel.prototype.datasource = {
        selectType: function (model) {
            return model.get('selectType') === 'multi' ? 'multi' : 'single';
        }
    };

    /**
     * @inheritDoc
     */
    // GoodChooserModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GoodChooserModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 10
    };


    // return模块
    require('er/util').inherits(GoodChooserModel, ListModel);
    return GoodChooserModel;
});
