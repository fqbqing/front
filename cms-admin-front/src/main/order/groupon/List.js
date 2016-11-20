/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrderGrouponList() {
        ListAction.apply(this, arguments);
    }

    OrderGrouponList.prototype.modelType = require('./ListModel');
    OrderGrouponList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrderGrouponList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrderGrouponList, ListAction);
    return OrderGrouponList;
});
