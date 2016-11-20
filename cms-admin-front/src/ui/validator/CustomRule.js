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
         * @class validator.CustomRule
         * @constructor
         */
        function CustomRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        CustomRule.prototype.type = 'custom';


        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        CustomRule.prototype.errorMessage = 
            '${title}格式不符合要求';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        CustomRule.prototype.check = function (value, control) {
            var checker = this.getLimitCondition(control);

            return new ValidityState(
                checker.call(control, value),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(CustomRule, Rule);
        require('esui/main').registerRule(CustomRule, 200);
        return CustomRule;
    }
);
