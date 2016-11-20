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
    function OrganizationActivityExihibitionList() {
        ListAction.apply(this, arguments);
    }

    OrganizationActivityExihibitionList.prototype.modelType = require('./ListModel');
    OrganizationActivityExihibitionList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    OrganizationActivityExihibitionList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationActivityExihibitionList, ListAction);
    return OrganizationActivityExihibitionList;
});
