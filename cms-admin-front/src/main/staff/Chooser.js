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
    function StaffChooser() {
        ListAction.apply(this, arguments);
    }

    StaffChooser.prototype.modelType = require('./ChooserModel');
    StaffChooser.prototype.viewType = require('./ChooserView');

    /**
     * @protected
     * @override
     */
    StaffChooser.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(StaffChooser, ListAction);
    return StaffChooser;
});
