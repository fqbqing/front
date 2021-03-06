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
        function MaxRowsRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        MaxRowsRule.prototype.type = 'maxRows';
        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        MaxRowsRule.prototype.errorMessage =
            '不能超过${maxRows}行';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        MaxRowsRule.prototype.check = function (value, control) {
            return new ValidityState(
                value.split('\n').length <= control.get('maxRows'),
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(MaxRowsRule, Rule);
        require('esui/main').registerRule(MaxRowsRule,211);
        return MaxRowsRule;
    }
);
