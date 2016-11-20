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
    function ImageAddModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    ImageAddModel.prototype.datasource = null;


    // return模块
    require('er/util').inherits(ImageAddModel, BaseModel);
    return ImageAddModel;
});
