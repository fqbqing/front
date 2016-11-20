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
    function ExhibitionCouponActivityDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityDetailView.prototype.template = 'TPL_exhibition_coupon_activity_detail';

    ExhibitionCouponActivityDetailView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityDetailView.prototype.uiProperties = {

    };

    ExhibitionCouponActivityDetailView.prototype.getVueOptions = function () {
        return {
        };
    };


    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityDetailView.prototype.uiEvents = {
        'status_select:change': function (e) {
            this.fire('statusSelect',{
                exhibition_coupon_activity_id: this.model.get('exhibition_id'),
                status: this.get('status_select').getValue()
            })
        }
    };

    require('er/util').inherits(ExhibitionCouponActivityDetailView, BaseView);
    return ExhibitionCouponActivityDetailView;
});
