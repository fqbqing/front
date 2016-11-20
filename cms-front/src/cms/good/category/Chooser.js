/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GoodCategoryChooser() {
        ListAction.apply(this, arguments);
    }

    GoodCategoryChooser.prototype.modelType = require('./ChooserModel');
    GoodCategoryChooser.prototype.viewType = require('./ChooserView');

    /**
     * 获取选中的项
     * @return {Array}
     */
    GoodCategoryChooser.prototype.getSelectedItems = function () {
        return this.view.getSelectedItems();
    };

    /**
     * @protected
     * @override
     */
    GoodCategoryChooser.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodCategoryChooser, ListAction);
    return GoodCategoryChooser;
});
