/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AccessGroupTree() {
        BaseAction.apply(this, arguments);
    }

    AccessGroupTree.prototype.modelType = require('./TreeModel');
    AccessGroupTree.prototype.viewType = require('./TreeView');

    /**
     * @protected
     * @override
     */
    AccessGroupTree.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    AccessGroupTree.prototype.getSelectedNode = function () {
        return this.view.getSelectedNode();
    };

    require('er/util').inherits(AccessGroupTree, BaseAction);
    return AccessGroupTree;
});
