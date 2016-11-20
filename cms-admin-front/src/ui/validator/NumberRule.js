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
         * @class validator.NumberRule
         * @constructor
         */
        function NumberRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        NumberRule.prototype.type = 'number';
        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        NumberRule.prototype.errorMessage =
            '请输入数字';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        NumberRule.prototype.check = function (value, control) {
            var numreg =/[^\d]/g;
            return new ValidityState(
                !numreg.test(value),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(NumberRule, Rule);
        require('esui/main').registerRule(NumberRule,211);
        return NumberRule;
    }
);
