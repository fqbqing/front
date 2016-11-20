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
    function OrganizationAlipay() {
        FormAction.apply(this, arguments);
    }

    OrganizationAlipay.prototype.modelType = require('./ApplyModel');
    OrganizationAlipay.prototype.viewType = require('./ApplyView');

    OrganizationAlipay.prototype.handleSubmitResult = function (result) {
        var me = this;
        me.view.waitAlert({
            title: '开通成功',
            content: '您已经成功开通“车大卖支付自有对公账户收款服务－支付宝支付”功能，现在将收款方选为“自有对公账户”就可以使用对公账户收款了',
            okText: '知道了'
        }).then(function (event) {
            me.redirect('/organization/alipay/detail');
        });

    };


    /**
     * @protected
     * @override
     */
    OrganizationAlipay.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here

    };

    require('er/util').inherits(OrganizationAlipay, FormAction);
    return OrganizationAlipay;
});
