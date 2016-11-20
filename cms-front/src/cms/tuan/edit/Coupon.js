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
    function TuanEditCoupon() {
        FormAction.apply(this, arguments);
    }

    TuanEditCoupon.prototype.modelType = require('./CouponModel');
    TuanEditCoupon.prototype.viewType = require('./CouponView');
    TuanEditCoupon.prototype.handleSubmitResult = function (result) {
        this.redirect('/tuan/list');
    };
    /**
     * @protected
     * @override
     */
    TuanEditCoupon.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(TuanEditCoupon, FormAction);
    return TuanEditCoupon;
});
