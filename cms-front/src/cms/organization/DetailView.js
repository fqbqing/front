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
    OrganizationDetailView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OrganizationDetailView.prototype.template = 'TPL_organization_detail';

    /**
     * @inheritDoc
     */
    OrganizationDetailView.prototype.uiProperties = {

    };
    OrganizationDetailView.prototype.getVueOptions = function () {
        return {
        };
    };
    /**
     * @inheritDoc
     */
    OrganizationDetailView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationDetailView, BaseView);
    return OrganizationDetailView;
});
