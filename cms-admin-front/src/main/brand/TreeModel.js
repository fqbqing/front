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
    function BrandTreeModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    BrandTreeModel.prototype.datasource = {
        brands: function () {
            return api.listBrand();
        }
    };


    // return模块
    require('er/util').inherits(BrandTreeModel, BaseModel);
    return BrandTreeModel;
});
