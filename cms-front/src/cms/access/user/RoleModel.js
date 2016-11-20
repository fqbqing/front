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
    function AccessUserRoleModel() {
        BaseModel.apply(this, arguments);
    }


    function adaptData(data) {
        var page = data;
        page.tableData = page.result || page.data;
        delete page.result;
        delete page.data;
        return page;
    }

    /**
     * @inheritDoc
     */
    AccessUserRoleModel.prototype.datasource = {
        roles: function (model) {
            return api.getUserRoles({
                id: model.get('id')
            }).then(function (data) {
                var ret = {};
                u.each(data, function (list, key) {
                    var arr = [];
                    u.each(list, function (name, id) {
                        arr.push({
                            id: id,
                            name: name
                        });
                    });
                    ret[key] = arr;
                });
                return ret;
            });
        },
        listPage: {
            retrieve: function (model) {
                return api.listRole({
                    pageNo: 1,
                    pageSize: 10
                }).then(adaptData);
            },
            dump: true
        },
        user: function (model) {
            return api.getUserById({
                id: model.get('id')
            }).then(function (data) {
                return data;
            });
        }
    };

    AccessUserRoleModel.prototype.saveRole = function () {
        var roles = this.get('roles').user;
        return api.updateUserRoles({
            id: this.get('id'),
            roleIds: u.pluck(roles, 'id').join(',')
        });
    };
    AccessUserRoleModel.prototype.getRoleList = function (query) {
        return api.listRole(query);
    };

    // return模块
    require('er/util').inherits(AccessUserRoleModel, BaseModel);
    return AccessUserRoleModel;
});
