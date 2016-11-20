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
    function OrganizationData() {
        BaseAction.apply(this, arguments);
    }

    OrganizationData.prototype.modelType = require('./DataModel');
    OrganizationData.prototype.viewType = require('./DataView');

    /**
     * @protected
     * @override
     */
    OrganizationData.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationData, BaseAction);
    return OrganizationData;
});
