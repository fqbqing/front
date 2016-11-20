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
        var view = require('bat-ria/mvc/BaseView');
        /**
         * 自定义方法检验规则
         *
         * @extends validator.Rule
         * @class validator.RelRule
         * @constructor
         */
        function RelRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        RelRule.prototype.type = 'rel';
        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        RelRule.prototype.errorMessage =
            '两次输入的密码不一致！';
        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */

        RelRule.prototype.check = function (value, control) {
            var relDom = this.getLimitCondition(control);
            var newPsw = control.viewContext.get(relDom).getValue();
            return new ValidityState(
                value === newPsw,
                this.getErrorMessage(control)
            );
        };
        require('esui/lib').inherits(RelRule, Rule);
        require('esui/main').registerRule(RelRule,212);
        return RelRule;
    }
);
