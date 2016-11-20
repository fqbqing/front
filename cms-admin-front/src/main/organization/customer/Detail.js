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
    function OrganizationCustomerDetail() {
        BaseAction.apply(this, arguments);
    }

    OrganizationCustomerDetail.prototype.modelType = require('./DetailModel');
    OrganizationCustomerDetail.prototype.viewType = require('./DetailView');

    /**
     * @protected
     * @override
     */
    OrganizationCustomerDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here


    };

    require('er/util').inherits(OrganizationCustomerDetail, BaseAction);
    return OrganizationCustomerDetail;
});
