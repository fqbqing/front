/*
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
*/

define(function(require) {
    var lib = require('esui/lib');
    var Control = require('esui/Control');
    var u = require('underscore');

    /**
     * 百分比进度条
     * @constructor
     * @param {Object} options 控件的初始化参数.
     */
    function ViewProgress(options) {
        Control.call(this, options);
    }

    ViewProgress.prototype.type = 'ViewProgress';


    /**
     * 初始化DOM结构
     *
     * @protected
     * @override
     */
    ViewProgress.prototype.initStructure = function() {
        // IGNORE
    };

    ViewProgress.prototype.initOptions = function(options) {
        var properties = {
            percent: 0,
            width: 'auto'
        };
        u.extend(properties, options);

        if (typeof properties.percent === 'string') {
            properties.percent = +properties.percent * 100;
        }

        if (typeof properties.width === 'string') {
            properties.width = +properties.width;
        }

        this.setProperties(properties);
    };

    function fillPercent(ctrl) {
        ctrl.main.style.width = ctrl.width + 'px';
        var html = ['<div class="inner" style="width: ' + ctrl.percent + '%"></div>'];
        html.push('<div class="percent">' + ctrl.percent + '%</div>');
        ctrl.main.innerHTML = html.join('');
        ctrl.setProperties({currentStep: ctrl.currentStep});
    }

    ViewProgress.prototype.repaint = require('esui/painters').createRepaint(
        Control.prototype.repaint,
        {
            name: 'percent',
            paint: fillPercent
        });

    lib.inherits(ViewProgress, Control);
    require('esui').register(ViewProgress);

    return ViewProgress;
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */
