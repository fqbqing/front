/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrderTuanCheck() {
        FormAction.apply(this, arguments);
    }

    OrderTuanCheck.prototype.modelType = require('./CheckModel');
    OrderTuanCheck.prototype.viewType = require('./CheckView');

    /**
     * @protected
     * @override
     */
    OrderTuanCheck.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrderTuanCheck, FormAction);
    return OrderTuanCheck;
});
