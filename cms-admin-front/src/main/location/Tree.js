/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function LocationTree() {
        BaseAction.apply(this, arguments);
    }

    LocationTree.prototype.modelType = require('./TreeModel');
    LocationTree.prototype.viewType = require('./TreeView');

    LocationTree.prototype.isMunicipality = function (node) {
        return node.type === 4;
    };

    LocationTree.prototype.isCity = function (node) {
        return node.type === 2;
    };

    LocationTree.prototype.isProvince = function (node) {
        return node.type === 1;
    };

    LocationTree.prototype.isDistrict = function (node) {
        return node.type === 3;
    };

    /**
     * 获取选中的节点
     * @return {meta.TreeItem}
     */
    LocationTree.prototype.getSelectedItem = function () {
        var tree = this.view.get('tree');
        var selectedNodes = tree.getSelectedNodes();
        if (selectedNodes && selectedNodes.length) {
            return selectedNodes[0];
        }
    };

    /**
     * @protected
     * @override
     */
    LocationTree.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(LocationTree, BaseAction);
    return LocationTree;
});
