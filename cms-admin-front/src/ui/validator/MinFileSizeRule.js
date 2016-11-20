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

    function MinFileSizeRule() {
        Rule.apply(this, arguments);
    }
    lib.inherits(MinFileSizeRule, Rule);

    MinFileSizeRule.prototype.type = 'minFileSize';

    /**
     * 默认的出错信息
     * @const
     * @type {string}
     */
    MinFileSizeRule.prototype.errorMessage = '附件不能小于${minFileSize}个字节，当前大小为${size}个字节';

    MinFileSizeRule.prototype.check = function (_1, control) {
        // controll.on('beforeFileQueued') 的时候记录一下当前文件的 file
        var file = control.getBeforeQueuedFile();
        return new ValidityState(
            file.size >= this.getLimitCondition(control),
            this.getErrorMessage(control)
        );
    };

    MinFileSizeRule.prototype.getErrorMessage = function (control) {
        var errorMessage = control.get(this.type + 'ErrorMessage') || this.errorMessage;
        var minFileSize = this.getLimitCondition(control);
        var file = control.getBeforeQueuedFile();
        return lib.format(errorMessage, {
            size: file.size,
            minFileSize: minFileSize
        });
    };

    MinFileSizeRule.prototype.getLimitCondition = function (control) {
        return parseInt(control.get('minFileSize'), 10);
    };

    require('esui').registerRule(MinFileSizeRule, 401);

    return MinFileSizeRule;
});






/* vim: set ts=4 sw=4 sts=4 tw=120: */
