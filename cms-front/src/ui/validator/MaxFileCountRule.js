/**
 * Copyright (c) 2015 Baidu.com, Inc. All Rights Reserved
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
 * @file
 * @author leeight
 */

define(function (require) {
    var Rule = require('esui/validator/Rule');
    var ValidityState = require('esui/validator/ValidityState');
    var lib = require('esui/lib');

    function MaxFileCountRule() {
        Rule.apply(this, arguments);
    }
    lib.inherits(MaxFileCountRule, Rule);

    MaxFileCountRule.prototype.type = 'maxFileCount';

    MaxFileCountRule.prototype.errorMessage = '附件不能超过${maxFileCount}个';

    MaxFileCountRule.prototype.check = function (_1, control) {
        // 成功上传之后，通过 control.increaseUploadedFileCount 来更新记录
        // 如果删除文件，也需要通过 control.decreaseUploadedFileCount 来更新记录
        return new ValidityState(
            control.getUploadedFileCount() < this.getLimitCondition(control),
            this.getErrorMessage(control)
        );
    };

    MaxFileCountRule.prototype.getErrorMessage = function (control) {
        var errorMessage = control.get(this.type + 'ErrorMessage') || this.errorMessage;
        var maxFileCount = this.getLimitCondition(control);
        return lib.format(errorMessage, {
            maxFileCount: maxFileCount
        });
    };

    MaxFileCountRule.prototype.getLimitCondition = function (control) {
        return parseInt(control.get('maxFileCount'), 10);
    };

    require('esui').registerRule(MaxFileCountRule, 401);

    return MaxFileCountRule;
});






/* vim: set ts=4 sw=4 sts=4 tw=120: */
