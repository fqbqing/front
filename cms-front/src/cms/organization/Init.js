/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationInit() {
        FormAction.apply(this, arguments);
    }

    OrganizationInit.prototype.modelType = require('./InitModel');
    OrganizationInit.prototype.viewType = require('./InitView');

    /**
     * @protected
     * @override
     */
    OrganizationInit.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationInit, FormAction);
    return OrganizationInit;
});
