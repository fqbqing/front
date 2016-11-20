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
    function GoodCategoryChooserModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listCategory;
    }


    /**
     * @inheritDoc
     */
    GoodCategoryChooserModel.prototype.datasource = {
        selectType: function (model) {
            return model.get('selectType') === 'multi' ? 'multi' : 'single';
        }
    };

    /**
     * @inheritDoc
     */
    // GoodCategoryChooserModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GoodCategoryChooserModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(GoodCategoryChooserModel, ListModel);
    return GoodCategoryChooserModel;
});
