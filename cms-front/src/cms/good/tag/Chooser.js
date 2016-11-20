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
    function GoodTagChooser() {
        BaseAction.apply(this, arguments);
    }

    GoodTagChooser.prototype.modelType = require('./ChooserModel');
    GoodTagChooser.prototype.viewType = require('./ChooserView');

    /**
     * @protected
     * @override
     */
    GoodTagChooser.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodTagChooser, BaseAction);
    return GoodTagChooser;
});
