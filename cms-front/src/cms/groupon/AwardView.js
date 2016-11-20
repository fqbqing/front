/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./award.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GrouponAwardView() {
        FormView.apply(this, arguments);
    }
    GrouponAwardView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GrouponAwardView.prototype.template = 'TPL_groupon_award';

    /**
     * @inheritDoc
     */
    GrouponAwardView.prototype.uiProperties = {
        signupAwardType: {
            datasource: constants.AWARD_TYPE_LIST
        },
        dealAwardType: {
            datasource: constants.AWARD_TYPE_LIST
        }
    };

    GrouponAwardView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                signupAwardType: 0,
                dealAwardType: 0,
                signupAwardVoucher: null,
                dealAwardVoucher: null,
                signupInvalid: false,
                dealInvalid: false

            },
            ready: function () {
                this.signupAwardType = this.signupAward.type;
                this.dealAwardType = this.dealAward.type;
                this.signupAwardVoucher = this.signupAward.voucher;
                this.dealAwardVoucher = this.dealAward.voucher;
            },
            methods: {
                chooseSignupAwardVoucher: function () {
                    me.fire('chooseVoucher',{
                        stage: constants.STAGE_SIGNUP
                    });
                },
                chooseDealAwardVoucher: function () {
                    me.fire('chooseVoucher',{
                        stage: constants.STAGE_DEAL
                    });
                }
            }
        };
    };
    GrouponAwardView.prototype.getExtraFormData = function () {
        var param = {
        };
        if (this.vue.signupAwardVoucher) {
            param.signup_award_voucher_id = this.vue.signupAwardVoucher.id;
        }
        if (this.vue.dealAwardVoucher) {
            param.deal_award_voucher_id = this.vue.dealAwardVoucher.id;
        }
        return param;
    };

    GrouponAwardView.prototype.getSubmitData = function () {
        var formData = this.getFormData();
        return u.extend(
            {},
            this.model.getSubmitData(formData)
        );
    };


    /**
     * @inheritDoc
     */
    GrouponAwardView.prototype.uiEvents = {
        'signupAwardType:change': function (e) {
            this.getVue().signupAwardType = e.target.getValue();
            this.getVue().signupAward.amount = 0;
            this.getVue().signupAwardVoucher = null;
        },
        'dealAwardType:change': function (e) {
            this.getVue().dealAwardType = e.target.getValue();
            this.getVue().dealAward.amount = 0;
            this.getVue().dealAwardVoucher = null;
        }
    };

    require('er/util').inherits(GrouponAwardView, FormView);
    return GrouponAwardView;
});
