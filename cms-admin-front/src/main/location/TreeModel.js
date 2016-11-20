/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
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
    function LocationTreeModel() {
        BaseModel.apply(this, arguments);
    }

    function fitTreeItem(item) {
        item.text = item.text || item.name;
        if (item.children && item.children.length) {
            u.each(item.children, function (it) {
                it.path = item.path + ' ' + it.name;
                fitTreeItem(it);
            });
        }
        else {
            item.leaf = true;
        }
    }

    /**
     * @inheritDoc
     */
    LocationTreeModel.prototype.datasource = {
        treeData: function (model) {
            return api.locationTree().then(function (data) {
                if (data.type > 0) {
                    data.path = data.path || data.text;
                }
                else {
                    data.path = '';
                }
                fitTreeItem(data);
                return data;
            });
        }
    };


    // return模块
    require('er/util').inherits(LocationTreeModel, BaseModel);
    return LocationTreeModel;
});
