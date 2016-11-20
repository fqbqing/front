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
    function OrganizationEdit() {
        FormAction.apply(this, arguments);
    }

    OrganizationEdit.prototype.modelType = require('./EditModel');
    OrganizationEdit.prototype.viewType = require('./EditView');

    /**
     * @protected
     * @override
     */
    OrganizationEdit.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationEdit, FormAction);
    return OrganizationEdit;
});
