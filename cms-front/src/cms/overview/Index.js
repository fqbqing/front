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
    function OverviewIndex() {
        BaseAction.apply(this, arguments);
    }

    OverviewIndex.prototype.modelType = require('./IndexModel');
    OverviewIndex.prototype.viewType = require('./IndexView');

    /**
     * @protected
     * @override
     */
    OverviewIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OverviewIndex, BaseAction);
    return OverviewIndex;
});
