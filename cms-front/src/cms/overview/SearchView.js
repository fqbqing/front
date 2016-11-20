/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./search.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OverviewSearchView() {
        BaseView.apply(this, arguments);
    }

    OverviewSearchView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OverviewSearchView.prototype.template = 'TPL_overview_search';

    /**
     * @inheritDoc
     */
    OverviewSearchView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OverviewSearchView.prototype.uiEvents = {};

    require('er/util').inherits(OverviewSearchView, BaseView);
    return OverviewSearchView;
});
