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
    function StaffIndexModel() {
        BaseModel.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    StaffIndexModel.prototype.datasource = {
        data: [{
            name: 'treeData',
            retrieve: function(){
                return api.staffGroupTree();
            }
        }, {
            name: 'staffData',
            retrieve: function (model) {
                var treeData = model.get('treeData');
                return api.listStaff({
                    staff_group_id: treeData.id,
                    pageSize: 15,
                    pageNo: 1
                }).then(function(page){
                    page.data = page.data || page.result;
                    return page;
                });
            }
        }]
    };

    StaffIndexModel.prototype.getStaff = function(e){
        return api.listStaff({
            staff_group_id: e.group_id,
            pageSize: e.pageSize,
            pageNo: e.pageNo
        })
    };

    StaffIndexModel.prototype.getGroupStaff = function(e){
        return api.listStaff({
            staff_group_id: e.group_id
        })
    };

    StaffIndexModel.prototype.deleteGroupStaff = function (ids) {
        return api.deleteStaff({
            id: ids
        });
    };

    StaffIndexModel.prototype.deleteGroup = function (e) {
        return api.deleteStaffGroup({
            id: e.id
        });
    };

    // return模块
    require('er/util').inherits(StaffIndexModel, BaseModel);
    return StaffIndexModel;
});
