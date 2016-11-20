/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./set.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherActivityEditSetView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    VoucherActivityEditSetView.prototype.template = 'TPL_voucher_activity_edit_set';

    /**
     * @inheritDoc
     */
    VoucherActivityEditSetView.prototype.uiProperties = {
    };

    /**
     * @inheritDoc
     */
    VoucherActivityEditSetView.prototype.uiEvents = {};

    require('er/util').inherits(VoucherActivityEditSetView, FormView);
    return VoucherActivityEditSetView;
});
