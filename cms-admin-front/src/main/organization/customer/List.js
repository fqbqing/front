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
    function OrganizationCustomerList() {
        ListAction.apply(this, arguments);
    }

    OrganizationCustomerList.prototype.modelType = require('./ListModel');
    OrganizationCustomerList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrganizationCustomerList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationCustomerList, ListAction);
    return OrganizationCustomerList;
});
