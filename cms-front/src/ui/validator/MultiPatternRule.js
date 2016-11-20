/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file MultiPatternRule.js
 * @author leeight
 */

define(function (require) {
    var lib = require('esui/lib');
    var Rule = require('esui/validator/Rule');
    var ValidityState = require('esui/validator/ValidityState');
    var u = require('underscore');

    /**
      * 正则检验规则，如果一个输入框里面可以输入多个邮箱地址，这些
      * 邮箱地址之间以;分割，那么就需要验证这些邮箱地址是否都是有效的
      *
      * 需要注意的是，当值为空时，此规则默认为通过。
      * 对于非空检验请使用{@link validator.RequiredRule}
      *
      * @extends validator.Rule
      * @class validator.MultiPatternRule
      * @constructor
      */
    function MultiPatternRule() {
        Rule.apply(this, arguments);
    }

    /**
      * 规则类型，始终为`"pattern"`
      *
      * @type {string}
      * @override
      */
    MultiPatternRule.prototype.type = 'multiPattern';


    /**
      * 错误提示信息
      *
      * @type {string}
      * @override
      */
    MultiPatternRule.prototype.errorMessage =
        '${value}格式不符合要求';

    /**
      * 验证控件的验证状态
      *
      * @param {string} value 校验值
      * @param {Control} control 待校验控件
      * @return {validator.ValidityState}
      * @override
      */
    MultiPatternRule.prototype.check = function (value, control) {
        var regex = new RegExp(this.getLimitCondition(control));
        var separator = control.get('separator') || /[;\s]+/g;
        var items = value.split(separator);

        for (var i = 0; i < items.length; i++) {
            var item = u.trim(items[i]);
            if (!item) {
                continue;
            }

            var valid = regex.test(item);
            if (!valid) {
                return new ValidityState(valid,
                    this.getErrorMessage(control, item));
            }
        }

        return new ValidityState(true, '');
    };

    /**
     * 获取验证对应的错误提示信息。
     *
     * @param {Control} control 待校验控件.
     * @param {string} value 验证失败的文字.
     * @return {string}
     */
    MultiPatternRule.prototype.getErrorMessage = function (control, value) {
        var errorMessage =
            control.get(this.type + 'ErrorMessage') || this.errorMessage;
        return lib.format(errorMessage, {value: value});
    };

    lib.inherits(MultiPatternRule, Rule);
    require('esui').registerRule(MultiPatternRule, 2000);

    return MultiPatternRule;
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */
