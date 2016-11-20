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
    function GoodSpecificationChooser() {
        BaseAction.apply(this, arguments);
    }

    GoodSpecificationChooser.prototype.modelType = require('./ChooserModel');
    GoodSpecificationChooser.prototype.viewType = require('./ChooserView');

    /**
     * @protected
     * @override
     */
    GoodSpecificationChooser.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodSpecificationChooser, BaseAction);
    return GoodSpecificationChooser;
});
