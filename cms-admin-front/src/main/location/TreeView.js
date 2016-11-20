/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
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
    function LocationTreeView() {
        BaseView.apply(this, arguments);
    }

    LocationTreeView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    LocationTreeView.prototype.template = 'TPL_location_tree';

    /**
     * @inheritDoc
     */
    LocationTreeView.prototype.uiProperties = {
        tree: {
            skin: 'location',
            strategy: new TreeStrategy({
                defaultExpand: false,
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
            hideRoot: true,
            wideToggleArea: false,
            datasource: '@treeData'
        }
    };

    LocationTreeView.prototype.getVueOptions = function () {
        return {
            data: {

            }
        };
    };

    /**
     * @inheritDoc
     */
    LocationTreeView.prototype.uiEvents = {};

    require('er/util').inherits(LocationTreeView, BaseView);
    return LocationTreeView;
});
