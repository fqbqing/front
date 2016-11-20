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
    function OrderExihibitionList() {
        ListAction.apply(this, arguments);
    }

    OrderExihibitionList.prototype.modelType = require('./ListModel');
    OrderExihibitionList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrderExihibitionList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrderExihibitionList, ListAction);
    return OrderExihibitionList;
});
