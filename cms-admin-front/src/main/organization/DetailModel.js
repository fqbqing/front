/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var u = require('underscore');

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
        orgInfo: function (model) {
            return api.getOrganizationById({
                group_id: model.get('organization_id')
            }).then(function (data) {
                var brands_name = u.pluck(data.brands, 'description').join(' / ');
                model.set('brands_name',brands_name);
                return data;
            });
        }
    };


    // return模块
    require('er/util').inherits(OrganizationDetailModel, BaseModel);
    return OrganizationDetailModel;
});
