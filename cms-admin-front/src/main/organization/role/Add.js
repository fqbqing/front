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
    function OrganizationRoleAdd() {
        FormAction.apply(this, arguments);
    }

    OrganizationRoleAdd.prototype.modelType = require('./AddModel');
    OrganizationRoleAdd.prototype.viewType = require('./AddView');


    OrganizationRoleAdd.prototype.handleSubmitResult = function (result) {
        var toast = this.getToastMessage(result);
        if (toast) {
            this.view.showToast(toast);
        }
        this.fire('aftersubmit', {
            result: result
        });
    };


    /**
     * @protected
     * @override
     */
    OrganizationRoleAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
    };

    require('er/util').inherits(OrganizationRoleAdd, FormAction);
    return OrganizationRoleAdd;
});
