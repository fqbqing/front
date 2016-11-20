/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var utils = require('common/utils');
    var constants = require('common/constants');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function GrouponAwardModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.someDetail;

        // 表单提交请求器 (*)
        // this.submitRequester = api.someUpdate;
    }


    /**
     * @inheritDoc
     */
    GrouponAwardModel.prototype.datasource = {
        constants: function () {
            return constants;
        }
    };


    /**
     * @inheritDoc
     */
    GrouponAwardModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    GrouponAwardModel.prototype.getExtraData = function () {
        return {};
    };

    GrouponAwardModel.prototype.filterData = function(data) {

        var signup_award_type = data.signup_award_type.join(',');
        var deal_award_type = data.deal_award_type.join(',');

        delete data.signup_award_type;
        delete data.deal_award_type;

        if (signup_award_type == constants.AWARD_TYPE_NO && deal_award_type == constants.AWARD_TYPE_NO) {
            return data;
        }
        else{
            var signupAward = {
                stage: constants.STAGE_SIGNUP,
                type: signup_award_type
            };
            var dealAward = {
                stage: constants.STAGE_DEAL,
                type: deal_award_type
            };

            if (signup_award_type == constants.AWARD_TYPE_CASH && data.signup_award_amount) {
                signupAward.amount = utils.roundAmount(data.signup_award_amount);
                delete data.signup_award_amount;
            }
            else if (signup_award_type == constants.AWARD_TYPE_VOUCHER && data.signup_award_voucher_id) {
                signupAward.voucher_id = data.signup_award_voucher_id;
                delete data.signup_award_voucher_id;
            }

            if (deal_award_type == constants.AWARD_TYPE_CASH && data.deal_award_amount) {
                dealAward.amount = utils.roundAmount(data.deal_award_amount);
                delete data.deal_award_amount;
            }
            else if (deal_award_type == constants.AWARD_TYPE_VOUCHER && data.deal_award_voucher_id) {
                dealAward.voucher_id = data.deal_award_voucher_id;
                delete data.deal_award_voucher_id;
            }

            data.agent_awards = [];

            if(signup_award_type != constants.AWARD_TYPE_NO){
                data.agent_awards.push(signupAward);
            }
            if(deal_award_type != constants.AWARD_TYPE_NO){
                data.agent_awards.push(dealAward);
            }
        }

        return data;
    };

    // return模块
    require('er/util').inherits(GrouponAwardModel, FormModel);
    return GrouponAwardModel;
});
