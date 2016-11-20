/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./data.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationDataView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationDataView.prototype.template = 'TPL_organization_data';

    /**
     * @inheritDoc
     */
    OrganizationDataView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrganizationDataView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationDataView, BaseView);
    return OrganizationDataView;
});
