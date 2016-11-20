/**
 * ESUI (Enterprise UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 自定义函数检验规则
 * @author jianling
 */
define(
    function (require) {
        var Rule = require('esui/validator/Rule');
        var ValidityState = require('esui/validator/ValidityState');
        /**
         * 自定义方法检验规则
         *
         * @extends validator.Rule
         * @class validator.PhoneRule
         * @constructor
         */
        function PhoneRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        PhoneRule.prototype.type = 'phone';

        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        PhoneRule.prototype.errorMessage = '请输入有效的手机号码！';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        PhoneRule.prototype.check = function (value, control) {
            var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
            return new ValidityState(
                !!phoneReg.test(value),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(PhoneRule, Rule);
        require('esui/main').registerRule(PhoneRule,212);
        return PhoneRule;
    }
);
