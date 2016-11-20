/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var u = require('underscore');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function MyChangepwdModel() {
        FormModel.apply(this, arguments);
        this.submitRequester = api.updatePassword;
    }


    /**
     * @inheritDoc
     */
    MyChangepwdModel.prototype.datasource = null;

    MyChangepwdModel.prototype.filterData = function(data) {
        delete data.confirmPwd;
        return data;
    };

    // return模块
    require('er/util').inherits(MyChangepwdModel, FormModel);
    return MyChangepwdModel;
});
