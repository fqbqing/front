/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OverviewSearch() {
        BaseAction.apply(this, arguments);
    }

    OverviewSearch.prototype.modelType = require('./SearchModel');
    OverviewSearch.prototype.viewType = require('./SearchView');

    /**
     * @protected
     * @override
     */
    OverviewSearch.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OverviewSearch, BaseAction);
    return OverviewSearch;
});
