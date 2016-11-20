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
    function VoucherAdd() {
        FormAction.apply(this, arguments);
    }

    VoucherAdd.prototype.modelType = require('./AddModel');
    VoucherAdd.prototype.viewType = require('./AddView');

    VoucherAdd.prototype.afterValidate = function (data) {
        var flag = false;

        if (!data.image_url) {
            this.handleLocalValidationErrors({
                image_url: '请上传封面图片'
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
    VoucherAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherAdd, FormAction);
    return VoucherAdd;
});
