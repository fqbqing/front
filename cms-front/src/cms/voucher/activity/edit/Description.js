/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var Deferred = require('er/Deferred');
    var u = require('underscore');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function VoucherActivityEditDescription() {
        FormAction.apply(this, arguments);
    }

    VoucherActivityEditDescription.prototype.modelType = require('./DescriptionModel');
    VoucherActivityEditDescription.prototype.viewType = require('./DescriptionView');

    VoucherActivityEditDescription.prototype.redirectAfterSubmit = function (result) {
        var url = '/voucher/activity/edit/set~id=' + this.model.get('id');
        this.redirect(url);
    };
    VoucherActivityEditDescription.prototype.afterValidate = function (data) {
        var flag = false;
        var images = JSON.parse(data.images);
        if (images.length) {
            u.each(images, function (item) {
                if (!item.image_url) {
                    flag = true;
                }
            });
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
    VoucherActivityEditDescription.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherActivityEditDescription, FormAction);
    return VoucherActivityEditDescription;
});
