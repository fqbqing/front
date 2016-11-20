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
 * @file
 * @author leeight
 */

define(function (require) {
    var Rule = require('esui/validator/Rule');
    var ValidityState = require('esui/validator/ValidityState');
    var lib = require('esui/lib');
    var u = require('underscore');

    function UniqueFileRule() {
        Rule.apply(this, arguments);
    }
    lib.inherits(UniqueFileRule, Rule);

    /**
     * @const
     * @type {string}
     */
    UniqueFileRule.prototype.type = 'uniqueFile';

    /**
     * 默认的出错信息
     * @const
     * @type {string}
     */
    UniqueFileRule.prototype.errorMessage = '文件“${name}”已存在';

    UniqueFileRule.prototype.check = function (_1, control) {
        // controll.on('beforeFileQueued') 的时候记录一下当前文件的 file
        var file = control.getBeforeQueuedFile();
        var found = false;

        var queue = control.uploader.getFiles();
        // console.log(queue);
        // console.log(file.__hash);
        u.each(queue, function (item) {
            if (item.__hash === file.__hash) {
                found = true;
            }
        });

        return new ValidityState(!found, this.getErrorMessage(control));
    };

    UniqueFileRule.prototype.getErrorMessage = function (control) {
        var errorMessage = control.get(this.type + 'ErrorMessage') || this.errorMessage;
        var file = control.getBeforeQueuedFile();
        return lib.format(errorMessage, file);
    };

    require('esui').registerRule(UniqueFileRule, 401);

    return UniqueFileRule;
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */
