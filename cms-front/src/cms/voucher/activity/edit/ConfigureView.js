/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./configure.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherActivityEditConfigureView() {
        FormView.apply(this, arguments);
    }

    VoucherActivityEditConfigureView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherActivityEditConfigureView.prototype.template = 'TPL_voucher_activity_edit_configure';

    /**
     * @inheritDoc
     */
    VoucherActivityEditConfigureView.prototype.uiProperties = {

    };

    VoucherActivityEditConfigureView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                vouchers: this.model.get('formData').vouchers || []
            },
            methods: {
                removeVoucher: function (idx) {
                    this.vouchers.splice(idx, 1);
                }
            }
        };
    };

    VoucherActivityEditConfigureView.prototype.getExtraFormData = function () {
        return {
            vouchers: this.vue.vouchers
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityEditConfigureView.prototype.uiEvents = {
        'addVoucherBtn:click': function () {
            if(this.vue.vouchers.length < 10) {
                this.fire('chooseVoucher');
            }
            else {
                this.alert('优惠券不超过10项');
            }
        }
    };

    require('er/util').inherits(VoucherActivityEditConfigureView, FormView);
    return VoucherActivityEditConfigureView;
});
