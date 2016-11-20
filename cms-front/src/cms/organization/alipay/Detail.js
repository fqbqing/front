/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var config = require('./../config');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationAlipayDetail() {
        BaseAction.apply(this, arguments);
    }

    OrganizationAlipayDetail.prototype.modelType = require('./DetailModel');
    OrganizationAlipayDetail.prototype.viewType = require('./DetailView');

    function toggleAlipay(e) {
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
                var title = '';
                var content = '';
                if(me.model.get('payAccount').account.status == config.PAY_ACCOUNT_ENABLE){
                    title = '停用成功';
                    content = '您已经停用“车大卖支付自有对公账户收款服务－支付宝支付”功能'
                }
                else {
                    title = '开通成功';
                    content = '您已经成功开通“车大卖支付自有对公账户收款服务－支付宝支付”功能，现在将收款方选为“自有对公账户”就可以使用对公账户收款了';
                }
                me.view.waitAlert({
                    title: title,
                    content: content,
                    okText: '知道了'
                }).then(function (event) {
                    me.reload();
                });
            }

        });
    }

    function updateAlipay(e) {
        this.redirect('/organization/alipay/apply');
    }

    /**
     * @protected
     * @override
     */
    OrganizationAlipayDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('toggleAlipay', toggleAlipay, this);
        this.view.on('updateAlipay', updateAlipay, this);
    };

    require('er/util').inherits(OrganizationAlipayDetail, BaseAction);
    return OrganizationAlipayDetail;
});
