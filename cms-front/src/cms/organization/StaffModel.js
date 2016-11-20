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
    function OrganizationStaffModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OrganizationStaffModel.prototype.datasource = {
        data: [{
            name: 'treeData',
            retrieve: function(){
                return api.groupTree();
            }
        }, {
            name: 'staffData',
            retrieve: function (model) {
                var treeData = model.get('treeData');
                return api.listAccessUser({
                    group_id: treeData.id,
                    pageSize: 15,
                    pageNo: 1
                }).then(function(page){
                    page.data = page.data || page.result;
                    return page;
                });
            }
        }]
    };

    OrganizationStaffModel.prototype.getStaff = function(e){
        return api.listAccessUser({
            group_id: e.group_id,
            pageSize: e.pageSize,
            pageNo: e.pageNo
        })
    };
    OrganizationStaffModel.prototype.getGroupStaff = function(e){
        return api.listAccessUser({
            group_id: e.group_id
        })
    };

    OrganizationStaffModel.prototype.deleteGroupStaff = function (ids) {
        return api.deleteAccessUser({
            id: ids
        });
    };
    OrganizationStaffModel.prototype.deleteGroup = function (e) {
        return api.deleteAccessGroup({
            id: e.id
        });
    };

    OrganizationStaffModel.prototype.moveGroupStaff = function (staffId, groupId) {
        return api.editAccessUser({
            id: staffId,
            group_id: groupId
        });
    };

    // return模块
    require('er/util').inherits(OrganizationStaffModel, BaseModel);
    return OrganizationStaffModel;
});
