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
    function ActivityCouponList() {
        ListAction.apply(this, arguments);
    }

    ActivityCouponList.prototype.modelType = require('./ListModel');
    ActivityCouponList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    ActivityCouponList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ActivityCouponList, ListAction);
    return ActivityCouponList;
});
