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
    function VoucherActivityEditSet() {
        FormAction.apply(this, arguments);
    }

    VoucherActivityEditSet.prototype.modelType = require('./SetModel');
    VoucherActivityEditSet.prototype.viewType = require('./SetView');

    VoucherActivityEditSet.prototype.redirectAfterSubmit = function (result) {
        var url = '/voucher/activity/edit/configure~id=' + this.model.get('id');
        this.redirect(url);
    };
    /**
     * @protected
     * @override
     */
    VoucherActivityEditSet.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherActivityEditSet, FormAction);
    return VoucherActivityEditSet;
});
