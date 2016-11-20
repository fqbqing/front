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
    function ExhibitionCouponOrderDetail() {
        BaseAction.apply(this, arguments);
    }

    ExhibitionCouponOrderDetail.prototype.modelType = require('./DetailModel');
    ExhibitionCouponOrderDetail.prototype.viewType = require('./DetailView');

    /**
     * @protected
     * @override
     */
    ExhibitionCouponOrderDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ExhibitionCouponOrderDetail, BaseAction);
    return ExhibitionCouponOrderDetail;
});
