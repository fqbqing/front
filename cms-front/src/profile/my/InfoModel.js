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
    function MyInfoModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    MyInfoModel.prototype.datasource = {
        user: function () {
            return api.getMyInfo();
        }
    };


    // return模块
    require('er/util').inherits(MyInfoModel, BaseModel);
    return MyInfoModel;
});
