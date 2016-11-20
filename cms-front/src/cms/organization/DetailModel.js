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
    function OrganizationDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OrganizationDetailModel.prototype.datasource = {
        orgInfo: function(){
            return api.getOrganization();
        }
    };

    // return模块
    require('er/util').inherits(OrganizationDetailModel, BaseModel);
    return OrganizationDetailModel;
});
