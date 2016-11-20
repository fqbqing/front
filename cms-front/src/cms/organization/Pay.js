/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var config = require('./config');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationPay() {
        BaseAction.apply(this, arguments);
    }

    OrganizationPay.prototype.modelType = require('./PayModel');
    OrganizationPay.prototype.viewType = require('./PayView');

    function radioSelectSetValue(control) {
        control.disable();
        var value = control.getValue() == config.PAY_ACCOUNT_PRIVATE ? config.PAY_ACCOUNT_CHEDAMAI : config.PAY_ACCOUNT_PRIVATE;
        control.setValue(value);
        control.enable();
    }
    function toggleService(e) {
        var me = this;
        var title = '启用“车大卖代收款服务”';
        var successText = '';
        if(e.status == config.PAY_ACCOUNT_PRIVATE){
            title = '启用“自有对公账户收款服务”';
            successText = '，现在可以使用收款了';
        }
        me.view.waitConfirm({
            title: title,
            content: '您确定'+ title +'吗？'
        }).then(function () {
            me.model.toggleService({
                status: e.status
            }).then(function () {
                me.view.waitAlert({
                    title: title,
                    content: '您已经'+ title + successText,
                    okText: '知道了'
                }).then(function (event) {
                    me.reload();
                });
            },function () {
                radioSelectSetValue(e.radioSelect);

            });
        },function () {
            radioSelectSetValue(e.radioSelect);
        });
    }

    function closeService(e) {
        var me = this;
        me.model.toggleService({
            status: config.PAY_ACCOUNT_CHEDAMAI
        }).then(function () {
            me.reload();
        });
    }

    function testPay(e) {
        var me = this;
        var newWindow = window.open('about:blank');
        me.model.testPay().then(function (data) {
            if (data.url) {
                newWindow.location.href = data.url;
            }
        }, function () {
            newWindow.close();
        });
    }

    /**
     * @protected
     * @override
     */
    OrganizationPay.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);
        var ali_url = this.model.get('aliPayAccount').account.status == config.PAY_ACCOUNT_DISABLE && !this.model.get('aliPayAccount').account.seller ? '/organization/alipay/apply' : '/organization/alipay/detail';
        this.view.get('alipayActionPanel').url = ali_url;
        this.view.get('alipayActionPanel').reload();

        var weixin_url = !!this.model.get('weixinApplyInfo') ? '/organization/weixinpay/detail' : '/organization/weixinpay/apply';
        this.view.get('weixinpayActionPanel').url = weixin_url;
        this.view.get('weixinpayActionPanel').reload();



        // bind event handlers here
        this.view.on('toggleService', toggleService, this);
        this.on('closeService', closeService, this);
        this.view.on('testPay', testPay, this);

    };

    require('er/util').inherits(OrganizationPay, BaseAction);
    return OrganizationPay;
});
