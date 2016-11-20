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
 * @file NationalIdNumberRule.js
 * @author leeight
 */

define(function (require) {
    var Rule = require('esui/validator/Rule');
    var ValidityState = require('esui/validator/ValidityState');
    var lib = require('esui/lib');

    var kDefaultProvinces = {
        11: '北京', 12: '天津', 13: '河北',
        14: '山西', 15: '内蒙古', 21: '辽宁',
        22: '吉林', 23: '黑龙江', 31: '上海',
        32: '江苏', 33: '浙江', 34: '安徽',
        35: '福建', 36: '江西', 37: '山东',
        41: '河南', 42: '湖北', 43: '湖南',
        44: '广东', 45: '广西', 46: '海南',
        50: '重庆', 51: '四川', 52: '贵州',
        53: '云南', 54: '西藏', 61: '陕西',
        62: '甘肃', 63: '青海', 64: '宁夏',
        65: '新疆', 71: '台湾', 81: '香港',
        82: '澳门', 91: '国外'
    };

    function NationalIdNumberRule() {
        Rule.apply(this, arguments);
    }

    lib.inherits(NationalIdNumberRule, Rule);

    /**
     * @type {string}
     * @const
     */
    NationalIdNumberRule.prototype.type = 'nationalIdNumber';

    /**
     * @type {string}
     * @const
     */
    NationalIdNumberRule.prototype.errorMessage = '身份证号码格式有误';

    NationalIdNumberRule.prototype.check = function (value, control) {
        var pass = new ValidityState(true, '');
        var fail = new ValidityState(false, this.getErrorMessage(control));

        if (this.getLimitCondition(control) === 'disable') {
            return pass;
        }

        if (!value) {
            return pass;
        }
        value = value.toLowerCase();
        var pattern = /^\d{17}[\dx]$/;
        if (!pattern.test(value)) {
            return fail;
        }

        var numbers = value.split('');
        var provinceId = numbers[0] + numbers[1];
        if (!kDefaultProvinces[provinceId]) {
            return fail;
        }

        // Check Sum
        var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var check = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];
        var checkSum = 0;
        for (var i = 0; i < 17; i++) {
            checkSum += +numbers[i] * wi[i];
        }

        if (numbers[17] !== check[checkSum % 11]) {
            return fail;
        }

        return pass;
    };

    require('esui').registerRule(NationalIdNumberRule, 401);

    return NationalIdNumberRule;
});

/* vim: set ts=4 sw=4 sts=4 tw=120: */
