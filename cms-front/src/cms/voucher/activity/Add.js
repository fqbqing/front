/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var Deferred = require('er/Deferred');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function VoucherActivityAdd() {
        FormAction.apply(this, arguments);
    }

    VoucherActivityAdd.prototype.modelType = require('./AddModel');
    VoucherActivityAdd.prototype.viewType = require('./AddView');

    VoucherActivityAdd.prototype.redirectAfterSubmit = function (result) {
        var url = '/voucher/activity/edit/description~id=' + result.id;
        this.redirect(url);
    };

    VoucherActivityAdd.prototype.afterValidate = function (data) {
        var flag = false;
        if (!data.share_image_url) {
            this.handleLocalValidationErrors({
                share_image_url: '请上传封面图片'
            });
            flag = true;
        }
        if (flag) {
            return Deferred.rejected();
        }
        return true;
    };

    /**
     * @protected
     * @override
     */
    VoucherActivityAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherActivityAdd, FormAction);
    return VoucherActivityAdd;
});
