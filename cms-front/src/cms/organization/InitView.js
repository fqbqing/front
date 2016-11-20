/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./init.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationInitView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationInitView.prototype.template = 'TPL_organization_init';

    /**
     * @inheritDoc
     */
    OrganizationInitView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrganizationInitView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationInitView, FormView);
    return OrganizationInitView;
});
