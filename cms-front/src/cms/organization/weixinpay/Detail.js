/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationWeixinpayDetail() {
        BaseAction.apply(this, arguments);
    }

    OrganizationWeixinpayDetail.prototype.modelType = require('./DetailModel');
    OrganizationWeixinpayDetail.prototype.viewType = require('./DetailView');

    function updateWeixinPay() {
        this.redirect('/organization/weixinpay/apply');
    }

    function closeWeiXinPay(e) {
        var me = this;
        me.model.updateAccountStatus().then(function (data) {
            if (!data.accounts && me.model.get('payAccount').merchant_status) {
                me.view.waitConfirm({
                    title: '停用成功',
                    content: '您已停用所有支付方式，需要将收款方切换为“车大卖”，否则影响用户支付',
                    okText: '切换'
                }).then(function (event) {
                    var topAction = require('er/controller').currentAction;
                    topAction.fire('closeService');
                });

            }
            else {
                me.view.waitAlert({
                    title: '停用成功',
                    content: '您已经停用“车大卖支付自有对公账户收款服务－微信支付”功能',
                    okText: '知道了'
                }).then(function (event) {
                    me.reload();
                });
            }
        });
    }
    /**
     * @protected
     * @override
     */
    OrganizationWeixinpayDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updateWeixinPay', updateWeixinPay, this);
        this.view.on('closeWeiXinPay', closeWeiXinPay, this);
    };

    require('er/util').inherits(OrganizationWeixinpayDetail, BaseAction);
    return OrganizationWeixinpayDetail;
});
