/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./apply.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationAlipayView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationAlipayView.prototype.template = 'TPL_organization_alipay_apply';

    /**
     * @inheritDoc
     */
    OrganizationAlipayView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrganizationAlipayView.prototype.uiEvents = {
        'copyRSA:aftercopy': function (e) {
            this.showToast('复制成功！');
        }

    };

    require('er/util').inherits(OrganizationAlipayView, FormView);
    return OrganizationAlipayView;
});
