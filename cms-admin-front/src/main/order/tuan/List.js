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
    function OrderTuanList() {
        ListAction.apply(this, arguments);
    }

    OrderTuanList.prototype.modelType = require('./ListModel');
    OrderTuanList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrderTuanList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrderTuanList, ListAction);
    return OrderTuanList;
});
