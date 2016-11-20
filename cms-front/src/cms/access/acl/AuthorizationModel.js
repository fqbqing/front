/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./config');
    var u = require('underscore');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function AccessAclAuthorizationModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    AccessAclAuthorizationModel.prototype.datasource = {
        who: function (model) {
            var id_type = model.get('id_type');
            var id = model.get('authorized_id');
            if (id_type == config.ID_TYPE_USER) {
                return api.getUserById({
                    id: id
                });
            }
            else {
                return api.getAccessGroupById({
                    id: id
                });
            }
        },
        permissions: function (model) {
            return api.getPermissions({
                authorized_id: model.get('authorized_id'),
                id_type: model.get('id_type')
            }).then(function (data) {
                var ret = {};
                if (data.user) {
                    ret.user = {};
                    u.each(data.user, function (item, ctrl) {
                        var obj = ret.user[ctrl] = {};
                        u.each(item, function (act) {
                            obj[act] = true;
                        });
                    });
                }
                if (data.group) {
                    ret.group = {};
                    u.each(data.group, function (item, ctrl) {
                        var obj = ret.group[ctrl] = {};
                        u.each(item, function (act) {
                            obj[act] = true;
                        });
                    });
                }
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
        config: function () {
            return config;
        }
    };

    AccessAclAuthorizationModel.prototype.updatePermissions = function (acl) {
        return api.updatePermissions({
            authorized_id: this.get('authorized_id'),
            id_type: this.get('id_type'),
            permissions: JSON.stringify(acl)
        });
    };


    // return模块
    require('er/util').inherits(AccessAclAuthorizationModel, BaseModel);
    return AccessAclAuthorizationModel;
});
