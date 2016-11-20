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
    function OverviewIndexView() {
        BaseView.apply(this, arguments);
    }

    OverviewIndexView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OverviewIndexView.prototype.template = 'TPL_overview_index';

    /**
     * @inheritDoc
     */
    OverviewIndexView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OverviewIndexView.prototype.uiEvents = {};

    require('er/util').inherits(OverviewIndexView, BaseView);
    return OverviewIndexView;
});
