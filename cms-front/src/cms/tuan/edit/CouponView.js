/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./coupon.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanEditCouponView() {
        FormView.apply(this, arguments);
    }

    TuanEditCouponView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    TuanEditCouponView.prototype.template = 'TPL_tuan_edit_coupon';

    TuanEditCouponView.prototype.getExtraFormData = function () {
        var coupon_refund = [];
        u.each(this.vue.coupon_refund, function (item) {
            coupon_refund.push(item);
        });
        return {
            coupon_refund: coupon_refund.join('\n')
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditCouponView.prototype.uiProperties = {

    };
    TuanEditCouponView.prototype.getVueOptions = function () {
        return {
            data: {
                coupon_refund: this.model.get('formData').coupon_refund || ['']
            },
            methods: {
                removeRefund: function (idx) {
                    this.coupon_refund.splice(idx, 1);
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditCouponView.prototype.uiEvents = {
        'addRefundBtn:click': function() {
            if(this.vue.coupon_refund.length < 10){
                this.vue.coupon_refund.push("");
            }else{
                this.alert('退还政策不超过10项');
            }
        }
    };


    require('er/util').inherits(TuanEditCouponView, FormView);
    return TuanEditCouponView;
});
