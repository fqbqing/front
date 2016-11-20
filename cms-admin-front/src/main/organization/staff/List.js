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
    function OrganizationStaffList() {
        ListAction.apply(this, arguments);
    }

    OrganizationStaffList.prototype.modelType = require('./ListModel');
    OrganizationStaffList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrganizationStaffList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationStaffList, ListAction);
    return OrganizationStaffList;
});
