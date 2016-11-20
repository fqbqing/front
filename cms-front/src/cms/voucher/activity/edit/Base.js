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
    function VoucherActivityEditBase() {
        FormAction.apply(this, arguments);
    }

    VoucherActivityEditBase.prototype.modelType = require('./BaseModel');
    VoucherActivityEditBase.prototype.viewType = require('./BaseView');

    VoucherActivityEditBase.prototype.redirectAfterSubmit = function (result) {
        var url = '/voucher/activity/edit/description~id=' + this.model.get('id');
        this.redirect(url);
    };
    VoucherActivityEditBase.prototype.afterValidate = function (data) {
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
    VoucherActivityEditBase.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherActivityEditBase, FormAction);
    return VoucherActivityEditBase;
});
