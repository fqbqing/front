/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OverviewSearchModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OverviewSearchModel.prototype.datasource = {
        result: function (model) {
            return api.globalSearchByPhone({
                phone: model.get('phone'),
                pageSize: 10
            });
        }
    };


    // return模块
    require('er/util').inherits(OverviewSearchModel, BaseModel);
    return OverviewSearchModel;
});
