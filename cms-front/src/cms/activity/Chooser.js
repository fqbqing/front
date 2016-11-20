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
    function ActivityChooser() {
        ListAction.apply(this, arguments);
    }

    ActivityChooser.prototype.modelType = require('./ChooserModel');
    ActivityChooser.prototype.viewType = require('./ChooserView');

    /**
     * @protected
     * @override
     */
    ActivityChooser.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ActivityChooser, ListAction);
    return ActivityChooser;
});
