/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./index.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationActivityIndexView() {
        BaseView.apply(this, arguments);
    }

    OrganizationActivityIndexView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationActivityIndexView.prototype.template = 'TPL_organization_activity_index';

    /**
     * @inheritDoc
     */
    OrganizationActivityIndexView.prototype.uiProperties = {

    };
    OrganizationActivityIndexView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {

            },
            methods: {
                redirect: function (url) {
                    window.location.href = url;
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationActivityIndexView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationActivityIndexView, BaseView);
    return OrganizationActivityIndexView;
});
