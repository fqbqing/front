/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ExhibitionCouponOrderDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ExhibitionCouponOrderDetailView.prototype.template = 'TPL_exhibition_coupon_order_detail';

    /**
     * @inheritDoc
     */
    ExhibitionCouponOrderDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    ExhibitionCouponOrderDetailView.prototype.uiEvents = {};

    require('er/util').inherits(ExhibitionCouponOrderDetailView, BaseView);
    return ExhibitionCouponOrderDetailView;
});
