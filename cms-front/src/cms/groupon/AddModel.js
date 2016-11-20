/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var utils = require('common/utils');
    var moment = require('moment');
    var u = require('underscore');
    var constants = require('common/constants');
    var config = require('./config');


    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function GrouponAddModel() {
        FormModel.apply(this, arguments);

        if (this.get('id')) {
            // 表单数据请求器
            this.formRequester = api.getGrouponById;
            // 表单提交请求器 (*)
            this.submitRequester = api.updateGroupon;
        }
        else {
            // 表单提交请求器 (*)
            this.submitRequester = api.addGroupon;
        }
    }


    /**
     * @inheritDoc
     */
    GrouponAddModel.prototype.datasource = {
        organization: function () {
            return api.getOrganization();
        },
        constants: function () {
            return constants;
        },
        config: function () {
            return config;
        }
    };


    /**
     * @inheritDoc
     */
    GrouponAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    GrouponAddModel.prototype.prepare = function () {
        var me = this;
        var signupAward = {
            stage: constants.STAGE_SIGNUP,
            type: constants.AWARD_TYPE_NO,
            amount: 0,
            voucher_id: 0,
            voucher: null
        };
        var dealAward = {
            stage: constants.STAGE_DEAL,
            type: constants.AWARD_TYPE_NO,
            amount: 0,
            voucher_id: 0,
            voucher: null
        };
        if (this.get('id')) {
            signupAward = u.extend(signupAward,u.find(this.get('formData').agentAwards, function (item) {
                return item.stage == constants.STAGE_SIGNUP;
            }));
            dealAward = u.extend(dealAward,u.find(this.get('formData').agentAwards, function (item) {
                return item.stage == constants.STAGE_DEAL;
            }));
        }
        this.set('signupAward', signupAward);
        this.set('dealAward', dealAward);
        return this;
    };


    /**
     * @inheritDoc
     */
    GrouponAddModel.prototype.getExtraData = function () {
        return {
            id: this.get('id')
        };
    };


    GrouponAddModel.prototype.filterData = function(data) {
        data.stage = 'base';
        data.activity_time = moment(data.activity_time).unix();
        data.signup_end_time = moment(data.signup_end_time).unix();
        data.beautify_number = data.beautify_number || 0;
        data.share_image = data.share_image || data.image;
        if (data.grouponType !== config.GROUPON_TYPE_FREE) {
            data.intention = JSON.stringify({
                name: data.intention_name,
                amount: utils.roundAmount(data.intention_amount),
                instruction: data.intention_instruction
            });
            delete data.intention_name;
            delete data.intention_amount;
            delete data.intention_instruction;
        }
        else {
            data.intention = '';
        }
        delete data.grouponType;
        if(data.agent_awards) {
            data.agent_awards = JSON.stringify(data.agent_awards);
        }
        return data;
    };

    // return模块
    require('er/util').inherits(GrouponAddModel, FormModel);
    return GrouponAddModel;
});
