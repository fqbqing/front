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
 * @file buildconfig.js
 * @author lifayu
 */
var fs = require('fs');
var path = require('path');

function expand(array) {
    // '~'的意思是扩展，edp-build 实现的时候自定义的语法
    // 比如代码中显示的用到了 esui/Button，那么可以自动被合并进去
    // 但是某些操作也会通过 require(['esui/Tab']) 来使用某个控件，这个
    // Tab是无法正确识别出来的，'~'可以把所有esui开头的模块都找到，合并到一起
    return array.map(function (item) {
        return '~' + item;
    });
}

function negative(array) {
    return array.map(function (item) {
        return '!' + item;
    });
}

function inegative(array) {
    var result = [];
    array.forEach(function (item) {
        if (!Array.isArray(item)) {
            result.push('!' + item);
        }
    });
    return result;
}

function compact(array) {
    var result = [];
    array.forEach(function (item) {
        if (Array.isArray(item)) {
            result.push.apply(result, compact(item));
        }
        else {
            result.push(item);
        }
    });

    return result;
}

/**
 * 用来计算 edp build 的时候，哪些模块应该合并到一起的工作.
 * 替代 module.conf 中 combine 字段的角色，因为有些工作需要
 * 动态的计算，module.conf 里面无法完成这部分功能.
 *
 * @return {Object}
 */
module.exports = function () {
    // 最基础的一些模块，各个服务直接是通用的，主要是 dep 下面的内容.
    // 模板被打包到 startup 中
    var dep = [
        '~crypt',
        'echarts',
        '~etpl',
        'fastclick',
        'frozen',
        'hammer',
        'saber-ajax',
        'saber-cookie',
        '~saber-dom',
        '~saber-emitter',
        '~saber-env',
        'saber-firework',
        '~saber-lang',
        'saber-matchmedia',
        '~saber-mm',
        '~saber-promise',
        '~saber-router',
        'saber-run',
        'saber-scroll',
        '~saber-storage',
        '~saber-string',
        '~saber-track',
        '~saber-uri',
        'saber-viewport',
        '~saber-widget',
        'underscore',
        'vue',
        'zepto'
    ];
    var base = [
        'echarts',
        'vue',
        'zepto'
        //'common/vue/*'
    ];

    var invalid = [
    ];

    var app = [
        'app',
        '~common',
        '~crypt',
        '~saber-storage',
        '~saber-env',
        '~saber-track',
        '~saber-uri',
        negative(base)
    ];

    var combine = {
        //'echarts': true,
        'vue': true,
        'zepto': true,
        'common/vue/component': {
            modules: compact([
                'common/vue/component',
                negative(dep)
            ])
        },
        'app': {
            modules: compact(app)
        }
    };

    /**
     * 从src/config.js中读取路由配置，智能合并页面
     */
    var actionFileContent = fs.readFileSync(path.join('./src/config.js'), 'utf8');
    var actionRegExp = /action:\s*'([^']+)'/g;
    var appNegative = inegative(app);
    var depNegative = inegative(dep);
    actionFileContent.replace(actionRegExp, function (target, action) {
        combine[action] = {
            modules: compact([
                '!tpl',
                appNegative,
                depNegative
            ])
        };
    });
    return combine;
};

/* vim: set ts=4 sw=4 sts=4 tw=120: */
