/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationActivityTuanList() {
        ListAction.apply(this, arguments);
    }

    OrganizationActivityTuanList.prototype.modelType = require('./ListModel');
    OrganizationActivityTuanList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrganizationActivityTuanList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationActivityTuanList, ListAction);
    return OrganizationActivityTuanList;
});
