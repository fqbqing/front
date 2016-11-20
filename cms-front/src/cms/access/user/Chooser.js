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
    function AccessUserChooser() {
        ListAction.apply(this, arguments);
    }

    AccessUserChooser.prototype.modelType = require('./ChooserModel');
    AccessUserChooser.prototype.viewType = require('./ChooserView');

    /**
     * @protected
     * @override
     */
    AccessUserChooser.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here

    };

    require('er/util').inherits(AccessUserChooser, ListAction);
    return AccessUserChooser;
});
