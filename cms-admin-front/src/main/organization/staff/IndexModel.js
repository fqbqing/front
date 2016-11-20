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
    function OrganizationStaffIndexModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OrganizationStaffIndexModel.prototype.datasource = {
        'treeData': function(model){
            return api.userGroupTree({
                'group_id': model.get('organization_id')
            });
        },
        'staffData': function (model) {
            return api.listUserCompany({
                'group_id': model.get('organization_id')
            }).then(function(page){
                page.data = page.data || page.result;
                return page;
            });
        }
    };

    OrganizationStaffIndexModel.prototype.getStaff = function(e){
        return api.listUserCompany({
            group_id: e.group_id,
            pageSize: e.pageSize,
            pageNo: e.pageNo
        })
    };
    OrganizationStaffIndexModel.prototype.getGroupStaff = function(e){
        return api.listUserCompany({
            group_id: e.group_id
        })
    };


    // return模块
    require('er/util').inherits(OrganizationStaffIndexModel, BaseModel);
    return OrganizationStaffIndexModel;
});
