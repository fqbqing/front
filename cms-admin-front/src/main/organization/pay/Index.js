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
    function OrganizationPayIndex() {
        FormAction.apply(this, arguments);
    }

    OrganizationPayIndex.prototype.modelType = require('./IndexModel');
    OrganizationPayIndex.prototype.viewType = require('./IndexView');

    OrganizationPayIndex.prototype.handleSubmitResult = function (result) {
        var me = this;
        me.view.waitAlert({
            title: '开通成功',
            content: '已为该商户开通“车大卖支付自有对公账户收款服务－微信支付”功能',
            okText: '知道了'
        }).then(function (event) {
            //me.reload();
            me.view.vue.weixinOpened = true;
        });

    };
    /**
     * @protected
     * @override
     */
    OrganizationPayIndex.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(OrganizationPayIndex, FormAction);
    return OrganizationPayIndex;
});
