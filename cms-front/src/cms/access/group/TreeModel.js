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
    function AccessGroupTreeModel() {
        BaseModel.apply(this, arguments);
    }

    function fitTreeItem(item) {
        item.text = item.text || item.name;
        if (item.children && item.children.length) {
            u.each(item.children, function (it) {
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
    AccessGroupTreeModel.prototype.datasource = {
        treeData: function (model) {
            return api.groupTree().then(function (data) {
                fitTreeItem(data);
                return data;
            });
        }
    };


    // return模块
    require('er/util').inherits(AccessGroupTreeModel, BaseModel);
    return AccessGroupTreeModel;
});
