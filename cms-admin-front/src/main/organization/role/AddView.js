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
    function OrganizationRoleAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationRoleAddView.prototype.template = 'TPL_organization_role_add';

    /**
     * @inheritDoc
     */
    OrganizationRoleAddView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrganizationRoleAddView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationRoleAddView, FormView);
    return OrganizationRoleAddView;
});
