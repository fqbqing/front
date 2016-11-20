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
    function OrganizationAlipayDetailView() {
        BaseView.apply(this, arguments);
    }
    OrganizationAlipayDetailView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationAlipayDetailView.prototype.template = 'TPL_organization_alipay_detail';

    /**
     * @inheritDoc
     */
    OrganizationAlipayDetailView.prototype.uiProperties = {

    };


    OrganizationAlipayDetailView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                enabled: false
            },
            ready: function () {
                this.enabled = this.payAccount.account.status == config.PAY_ACCOUNT_ENABLE;
            },
            methods: {
                updateAlipay: function () {
                    me.fire('updateAlipay');
                },
                ennableAlipay: function () {
                    me.fire('toggleAlipay');
                },
                closeAlipay: function (e) {
                    me.fire('toggleAlipay');
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationAlipayDetailView.prototype.uiEvents = {
        'copyRSA:aftercopy': function (e) {
            this.showToast('复制成功！');
        }
    };

    require('er/util').inherits(OrganizationAlipayDetailView, BaseView);
    return OrganizationAlipayDetailView;
});
