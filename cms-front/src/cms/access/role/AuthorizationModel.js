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
    function AccessRoleAuthorizationModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    AccessRoleAuthorizationModel.prototype.datasource = {
        role: function (model) {
            return api.getRoleById({
                id: model.get('id')
            });
        },
        permissions: function (model) {
            return api.getRolePermissions({
                id: model.get('id')
            }).then(function (data) {
                var ret = {};
                u.each(data, function (item, ctrl) {
                    var obj = ret[ctrl] = {};
                    u.each(item, function (act) {
                        obj[act] = true;
                    });
                });
                return ret;
            });
        },
        ctrls: function (model) {
            return api.listAcl().then(function (list) {
                var ctrls = [];
                u.each(list, function (item, key) {
                    var acts = [];
                    u.each(item.actions, function (text, name) {
                        acts.push({
                            checked: false,
                            disabled: false,
                            name: name,
                            text: text
                        });
                    });
                    ctrls.push({
                        name: key,
                        text: item.desc,
                        checked: false,
                        disabled: false,
                        actions: acts
                    });
                });
                return u.sortBy(ctrls, function (ctrl) {
                    return ctrl.name;
                });
            });
        },
        dataPermissions: function (model) {
            return api.getDataPermissions({
                id: model.get('id')
            })
        },
        allDataPermissions: function (model) {
            return api.getAllDataPermissions()
        }

    };

    AccessRoleAuthorizationModel.prototype.updatePermissions = function (acl) {
        return api.updateRolePermissions({
            id: this.get('id'),
            permissions: JSON.stringify(acl)
        });
    };
    AccessRoleAuthorizationModel.prototype.updateDataPermissions = function (acl) {
        return api.updateDataPermissions({
            id: this.get('id'),
            permissions:acl
        });
    };



    // return模块
    require('er/util').inherits(AccessRoleAuthorizationModel, BaseModel);
    return AccessRoleAuthorizationModel;
});
