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
    function LevelAuthorizationModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    LevelAuthorizationModel.prototype.datasource = {
        level: function (model) {
            return api.getLevelById({
                id: model.get('id')
            });
        },
        permissions: function (model) {
            return api.getLevelPermissions({
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
            return api.listOrganizationAcl().then(function (list) {
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
            return api.getLevelDataPermissions({
                id: model.get('id')
            })
        },
        allDataPermissions: function (model) {
            return api.getAllLevelDataPermissions()
        },
        dataLimits: function (model) {
            return api.getLevelDataLimits({
                id: model.get('id')
            });
        },
        allDataLimits: function (model) {
            return api.getAllLevelDataLimits();
        }
    };

    LevelAuthorizationModel.prototype.updatePermissions = function (acl) {
        return api.updateLevelPermissions({
            id: this.get('id'),
            permissions: JSON.stringify(acl)
        });
    };

    LevelAuthorizationModel.prototype.updateDataPermissions = function (acl) {
        return api.updateLevelDataPermissions({
            id: this.get('id'),
            permissions:acl
        });
    };

    LevelAuthorizationModel.prototype.updateDataLimits = function (data) {
        var param = {
            id: this.get('id')
        };
        param.data_limits = JSON.stringify(data);
        return api.updateLevelDataLimits(param);
    };

    // return模块
    require('er/util').inherits(LevelAuthorizationModel, BaseModel);
    return LevelAuthorizationModel;
});
