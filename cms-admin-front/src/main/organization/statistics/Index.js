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
    function OrganizationStatisticsIndex() {
        BaseAction.apply(this, arguments);
    }

    OrganizationStatisticsIndex.prototype.modelType = require('./IndexModel');
    OrganizationStatisticsIndex.prototype.viewType = require('./IndexView');

    /**
     * @protected
     * @override
     */
    OrganizationStatisticsIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationStatisticsIndex, BaseAction);
    return OrganizationStatisticsIndex;
});
