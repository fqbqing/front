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
    function GoodChooser() {
        ListAction.apply(this, arguments);
    }

    GoodChooser.prototype.modelType = require('./ChooserModel');
    GoodChooser.prototype.viewType = require('./ChooserView');

    /**
     * 获取选中的项
     * @return {Array}
     */
    GoodChooser.prototype.getSelectedItems = function () {
        return this.view.getSelectedItems();
    };

    /**
     * @protected
     * @override
     */
    GoodChooser.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodChooser, ListAction);
    return GoodChooser;
});
