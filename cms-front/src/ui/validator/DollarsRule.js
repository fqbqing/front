
define(
    function (require) {
        var Rule = require('esui/validator/Rule');
        var ValidityState = require('esui/validator/ValidityState');
        /**
         * 自定义方法检验规则
         *
         * @extends validator.Rule
         * @class validator.DollarsRule
         * @constructor
         */
        function DollarsRule() {
            Rule.apply(this, arguments);
        }

        /**
         * 规则类型，始终为`"function"`
         * 
         * @type {string}
         * @override
         */
        DollarsRule.prototype.type = 'dollars';
        /**
         * 错误提示信息
         *
         * @type {string}
         * @override
         */
        DollarsRule.prototype.errorMessage =
            '不包含字符或者最多两位小数';

        /**
         * 验证控件的验证状态
         *
         * @param {string} value 校验值
         * @param {Control} control 待校验控件
         * @return {validator.ValidityState}
         * @override
         */
        DollarsRule.prototype.check = function (value, control) {
            var dollarsReg1 = /^[0-9]+\.[0-9]{0,2}$/g;
            var dollarsReg2 = /^\d+$/g;
            var flag = false;
            if ( dollarsReg1.test(value) || dollarsReg2.test(value)) {
                flag = true;
            }
            return new ValidityState(
                flag,
                this.getErrorMessage(control)
            );
        };

        require('esui/lib').inherits(DollarsRule, Rule);
        require('esui/main').registerRule(DollarsRule,212);
        return DollarsRule;
    }
);
