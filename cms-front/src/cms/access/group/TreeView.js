/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./tree.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var TreeStrategy = require('esui/TreeStrategy');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AccessGroupTreeView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AccessGroupTreeView.prototype.template = 'TPL_access_group_tree';

    /**
     * @inheritDoc
     */
    AccessGroupTreeView.prototype.uiProperties = {
        tree: {
            skin: 'org',
            strategy: new TreeStrategy({
                defaultExpand: true,
                isLeafNode: function (node) {
                    return node.leaf;
                },
                enableToggleStrategy: function (tree) {
                    tree.on(
                        'expand',
                        function (e) {
                            if (e.node.children && e.node.children.length) {
                                tree.expandNode(e.node.id);
                            }
                            else if (!e.node.leaf) {
                            }
                        }
                    );
                    tree.on(
                        'collapse',
                        function (e) {
                            this.collapseNode(e.node.id, false);
                        }
                    );
                }
            }),
            hideRoot: false,
            wideToggleArea: false,
            datasource: '@treeData'
        }
    };

    /**
     * @inheritDoc
     */
    AccessGroupTreeView.prototype.uiEvents = {};

    AccessGroupTreeView.prototype.getSelectedNode = function () {
        var tree = this.get('tree');
        var selectedNodes = tree.getSelectedNodes();
        if (selectedNodes && selectedNodes.length) {
            return selectedNodes[0];
        }
    };

    require('er/util').inherits(AccessGroupTreeView, BaseView);
    return AccessGroupTreeView;
});
