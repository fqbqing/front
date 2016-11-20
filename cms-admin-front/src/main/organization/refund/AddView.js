/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationRefundAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationRefundAddView.prototype.template = 'TPL_organization_refund_add';

    /**
     * @inheritDoc
     */
    OrganizationRefundAddView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrganizationRefundAddView.prototype.uiEvents = {
        'chooseMarchers:click': function () {
            this.fire('chooseMarchers',{
                organization_id: this.model.get('organization_id')
            });
        }
    };

    require('er/util').inherits(OrganizationRefundAddView, FormView);
    return OrganizationRefundAddView;
});
