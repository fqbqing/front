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
    function BrandTree() {
        BaseAction.apply(this, arguments);
    }

    BrandTree.prototype.modelType = require('./TreeModel');
    BrandTree.prototype.viewType = require('./TreeView');

    /**
     * 获取选中的节点
     * @return {meta.TreeItem}
     */
    BrandTree.prototype.getSelectedItem = function () {
        var brands = this.view.vue.$refs.brands;
        var selectedBrands = brands.getSelectedBrands();
        if (selectedBrands && selectedBrands.length) {
            return selectedBrands;
        }
    };
    /**
     * @protected
     * @override
     */
    BrandTree.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(BrandTree, BaseAction);
    return BrandTree;
});
