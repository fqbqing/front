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
    function OrganizationList() {
        ListAction.apply(this, arguments);
    }

    OrganizationList.prototype.modelType = require('./ListModel');
    OrganizationList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrganizationList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationList, ListAction);
    return OrganizationList;
});
