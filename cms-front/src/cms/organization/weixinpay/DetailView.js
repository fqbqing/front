/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var config = require('./../config');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationWeixinpayDetailView() {
        BaseView.apply(this, arguments);
    }
    OrganizationWeixinpayDetailView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayDetailView.prototype.template = 'TPL_organization_weixinpay_detail';

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayDetailView.prototype.uiProperties = {

    };
    OrganizationWeixinpayDetailView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                //opening: false,
                opened: false,
                isShow: false
            },
            computed: {
                showText: function () {
                    return this.isShow ? '收起资料' : '查看资料'
                }
            },
            ready: function () {
                if (this.payAccount.account) {
                    this.opened = this.payAccount.account.status == config.PAY_ACCOUNT_ENABLE;
                }
            },
            methods: {
                updateWeixinPay: function (e) {
                    me.fire('updateWeixinPay');
                },
                closeWeiXinPay: function (e) {
                    me.fire('closeWeiXinPay');
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayDetailView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationWeixinpayDetailView, BaseView);
    return OrganizationWeixinpayDetailView;
});
