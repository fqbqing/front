/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./index.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationPayIndexView() {
        FormView.apply(this, arguments);
    }
    OrganizationPayIndexView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OrganizationPayIndexView.prototype.template = 'TPL_organization_pay_index';

    /**
     * @inheritDoc
     */
    OrganizationPayIndexView.prototype.uiProperties = {

    };
    OrganizationPayIndexView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                //opening: false
                aliOpened: false,
                weixinOpened: false,
                isShow: false
            },
            computed: {
                showText: function () {
                    return this.isShow ? '收起微信开通资料' : '查看微信开通资料'
                }
            },
            ready: function () {
                this.aliOpened = this.aliPayAccount.account.status == 1;
                if(this.weixinPayAccount.account){
                    this.weixinOpened = this.weixinPayAccount.account.status == 1;
                }

            }
        };
    };
    /**
     * @inheritDoc
     */
    OrganizationPayIndexView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationPayIndexView, FormView);
    return OrganizationPayIndexView;
});
