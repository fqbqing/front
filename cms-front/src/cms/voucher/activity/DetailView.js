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
    function VoucherActivityDetailView() {
        BaseView.apply(this, arguments);
    }

    VoucherActivityDetailView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherActivityDetailView.prototype.template = 'TPL_voucher_activity_detail';

    VoucherActivityDetailView.prototype.getVueOptions = function () {
        return {
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    VoucherActivityDetailView.prototype.uiEvents = {
        'status_select:change': function (e) {
            this.fire('statusSelect',{
                status: this.get('status_select').getValue()
            })
        },
        'cp:aftercopy': function () {
            this.showToast('复制成功');
        }
    };

    require('er/util').inherits(VoucherActivityDetailView, BaseView);
    return VoucherActivityDetailView;
});
