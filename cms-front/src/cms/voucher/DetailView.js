/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherDetailView() {
        FormView.apply(this, arguments);
    }

    VoucherDetailView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherDetailView.prototype.template = 'TPL_voucher_detail';

    /**
     * @inheritDoc
     */
    VoucherDetailView.prototype.uiProperties = {

    };
    VoucherDetailView.prototype.getVueOptions = function () {
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
    VoucherDetailView.prototype.uiEvents = {};

    require('er/util').inherits(VoucherDetailView, FormView);
    return VoucherDetailView;
});
