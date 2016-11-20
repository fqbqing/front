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
    function OrganizationWeixinpayApply() {
        FormAction.apply(this, arguments);
    }

    OrganizationWeixinpayApply.prototype.modelType = require('./ApplyModel');
    OrganizationWeixinpayApply.prototype.viewType = require('./ApplyView');

    OrganizationWeixinpayApply.prototype.handleSubmitResult = function (result) {
        var me = this;
        me.view.waitAlert({
            title: '申请成功',
            content: '您已完成“车大卖支付自有对公账户收款服务－微信支付”功能开通申请，请耐心等待审核，审核通过后方可使用！',
            okText: '知道了'
        }).then(function (event) {
            me.redirect('/organization/weixinpay/detail');
        });
    };

    OrganizationWeixinpayApply.prototype.afterValidate = function (data) {
        var flag = false;
        if (!data.licence_img_url) {
            this.handleLocalValidationErrors({
                licence_img_url: '请上传封面图片'
            });
            flag = true;
        }
        if (!data.code_img_url) {
            this.handleLocalValidationErrors({
                code_img_url: '请上传封面图片'
            });
            flag = true;
        }
        if (!data.identity_card_front_img_url) {
            this.handleLocalValidationErrors({
                identity_card_front_img_url: '请上传封面图片'
            });
            flag = true;
        }
        if (!data.identity_card_reverse_img_url) {
            this.handleLocalValidationErrors({
                identity_card_reverse_img_url: '请上传封面图片'
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
    OrganizationWeixinpayApply.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here


    };

    require('er/util').inherits(OrganizationWeixinpayApply, FormAction);
    return OrganizationWeixinpayApply;
});
