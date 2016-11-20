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
    function ExhibitionCouponOrderList() {
        ListAction.apply(this, arguments);
    }

    ExhibitionCouponOrderList.prototype.modelType = require('./ListModel');
    ExhibitionCouponOrderList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    ExhibitionCouponOrderList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ExhibitionCouponOrderList, ListAction);
    return ExhibitionCouponOrderList;
});
