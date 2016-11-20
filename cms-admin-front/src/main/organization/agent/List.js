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
    function OrganizationAgentList() {
        ListAction.apply(this, arguments);
    }

    OrganizationAgentList.prototype.modelType = require('./ListModel');
    OrganizationAgentList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrganizationAgentList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationAgentList, ListAction);
    return OrganizationAgentList;
});
