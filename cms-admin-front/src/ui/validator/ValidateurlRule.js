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
        var utils = require('common/utils');

        /**
         * 自定义方法检验规则
         *
         * @extends validator.Rule
         * @class validator.NumberRule
         * @constructor
         */
        function ValidateurlRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        ValidateurlRule.prototype.type = 'validateurl';
        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        ValidateurlRule.prototype.errorMessage =
            '请输入合法的url';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        ValidateurlRule.prototype.check = function (value, control) {
            return new ValidityState(
                !!utils.isURL(value),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(ValidateurlRule, Rule);
        require('esui/main').registerRule(ValidateurlRule,405);
        return ValidateurlRule;
    }
);
