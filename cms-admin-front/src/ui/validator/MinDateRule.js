/**
 * ESUI (Enterprise UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 最小时间
 * @author otakustay
 */
define(
    function (require) {
        var Rule = require('esui/validator/Rule');
        var ValidityState = require('esui/validator/ValidityState');
        var moment = require('moment');
        var utils = require('common/utils');

        /**
         * 最大字符长度的验证规则
         *
         * @extends validator.Rule
         * @class validator.MinDateRule
         * @constructor
         */
        function MinDateRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"minDate"`
         *
         * @type {string}
         * @override
         */
        MinDateRule.prototype.type = 'minDate';


        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        MinDateRule.prototype.errorMessage =
            "${title}不能小于${minDate}";

        MinDateRule.prototype.getErrorMessage = function (control) {
            return '时间不能小于' + utils.dateFormat(this.getLimitCondition(control),'YYYY-MM-DD');
        };
        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        MinDateRule.prototype.check = function (value, control) {
            return new ValidityState(
                !(moment(value).unix() < this.getLimitCondition(control)),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(MinDateRule, Rule);
        require('esui/main').registerRule(MinDateRule, 300);
        return MinDateRule;
    }
);
