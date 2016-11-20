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
    function OverviewStat() {
        BaseAction.apply(this, arguments);
    }

    OverviewStat.prototype.modelType = require('./StatModel');
    OverviewStat.prototype.viewType = require('./StatView');

    /**
     * @protected
     * @override
     */
    OverviewStat.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OverviewStat, BaseAction);
    return OverviewStat;
});
