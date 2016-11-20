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
    function OrderVoucherList() {
        ListAction.apply(this, arguments);
    }

    OrderVoucherList.prototype.modelType = require('./ListModel');
    OrderVoucherList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrderVoucherList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrderVoucherList, ListAction);
    return OrderVoucherList;
});
