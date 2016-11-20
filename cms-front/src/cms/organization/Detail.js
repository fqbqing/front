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
    function OrganizationDetail() {
        BaseAction.apply(this, arguments);
    }

    OrganizationDetail.prototype.modelType = require('./DetailModel');
    OrganizationDetail.prototype.viewType = require('./DetailView');

    /**
     * @protected
     * @override
     */
    OrganizationDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationDetail, BaseAction);
    return OrganizationDetail;
});
