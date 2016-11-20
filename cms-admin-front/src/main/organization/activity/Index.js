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
    function OrganizationActivityIndex() {
        BaseAction.apply(this, arguments);
    }

    OrganizationActivityIndex.prototype.modelType = require('./IndexModel');
    OrganizationActivityIndex.prototype.viewType = require('./IndexView');

    /**
     * @protected
     * @override
     */
    OrganizationActivityIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationActivityIndex, BaseAction);
    return OrganizationActivityIndex;
});
