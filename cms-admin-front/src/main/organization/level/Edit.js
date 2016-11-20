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
    function OrganizationLevelEdit() {
        FormAction.apply(this, arguments);
    }

    OrganizationLevelEdit.prototype.modelType = require('./EditModel');
    OrganizationLevelEdit.prototype.viewType = require('./EditView');

    /**
     * @protected
     * @override
     */
    OrganizationLevelEdit.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationLevelEdit, FormAction);
    return OrganizationLevelEdit;
});
