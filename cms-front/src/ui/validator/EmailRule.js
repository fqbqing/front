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
        function EmailRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        EmailRule.prototype.type = 'email';

        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        EmailRule.prototype.errorMessage = '请输入有效的邮箱！';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        EmailRule.prototype.check = function (value, control) {
            //var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return new ValidityState(
                !!emailReg.test(value),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(EmailRule, Rule);
        require('esui/main').registerRule(EmailRule,212);
        return EmailRule;
    }
);
