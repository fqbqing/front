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
    function OrganizationDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationDetailView.prototype.template = 'TPL_organization_detail';

    /**
     * @inheritDoc
     */
    OrganizationDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrganizationDetailView.prototype.uiEvents = {
        'updateOrganizationLevel:click': function () {
            this.fire('updateOrganizationLevel',{
                organization_id: this.model.get('organization_id')
            });
        }
    };

    require('er/util').inherits(OrganizationDetailView, BaseView);
    return OrganizationDetailView;
});
