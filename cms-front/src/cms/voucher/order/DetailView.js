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
    function VoucherOrderDetailView() {
        BaseView.apply(this, arguments);
    }

    VoucherOrderDetailView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherOrderDetailView.prototype.template = 'TPL_voucher_order_detail';

    /**
     * @inheritDoc
     */
    VoucherOrderDetailView.prototype.uiProperties = {

    };
    VoucherOrderDetailView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
            },
            methods: {

            }
        };
    };

    /**
     * @inheritDoc
     */
    VoucherOrderDetailView.prototype.uiEvents = {};

    require('er/util').inherits(VoucherOrderDetailView, BaseView);
    return VoucherOrderDetailView;
});
