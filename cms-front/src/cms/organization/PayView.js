/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./pay.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var config = require('./config');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationPayView() {
        BaseView.apply(this, arguments);
    }
    OrganizationPayView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationPayView.prototype.template = 'TPL_organization_pay';

    /**
     * @inheritDoc
     */
    OrganizationPayView.prototype.uiProperties = {
        toggleServiceBtn: {
            datasource: config.PAY_ACCOUNT_LIST
        }
    };
    /**
     * Vue相关配置
     * @return {Object}
     */
    OrganizationPayView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                //opening: false,
                opened: false,
                enabled: false,
                isShow: false
            },
            ready: function () {
                this.enabled = this.aliPayAccount.merchant_status == config.PAY_ACCOUNT_PRIVATE;  // 自有对公账号开启测试
            },
            methods: {
                testPay: function (e) {
                    me.fire('testPay');
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationPayView.prototype.uiEvents = {
        'toggleServiceBtn:change': function (e) {
            this.fire('toggleService',{
                radioSelect: e.target,
                status: e.target.getValue()
            });
        }
    };

    require('er/util').inherits(OrganizationPayView, BaseView);
    return OrganizationPayView;
});
