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
 * @file Clipboard.js
 * @author leeight
 */

define(function (require) {
    var u = require('underscore');
    var lib = require('esui/lib');
    var Control = require('esui/Control');
    var ZeroClipboard = require('zeroclipboard');

    ZeroClipboard.config({
        swfPath: require.toUrl('zeroclipboard/ZeroClipboard.swf')
    });

    /**
     * 把 ZeroClipboard 封装为一个 esui 控件，方便在系统中使用。例如
     *
     *     @example
     *     <div data-ui-id="cp"
     *          data-ui-type="Clipboard"
     *          data-ui-clipboard-text="@clipboardText"></div>
     *
     *     // javascript
     *     this.view.get('cp').on('aftercopy', function () {
     *         alert('Copyed');
     *     });
     *
     * @constructor
     * @param {Object} options 控件初始化参数.
     * @extends Control
     */
    function Clipboard(options) {
        Control.call(this, options);

        /**
         * @type {ZeroClipboard}
         */
        this.client = null;
    }
    lib.inherits(Clipboard, Control);

    /**
     * @type {string}
     * @const
     */
    Clipboard.prototype.type = 'Clipboard';

    /**
     * 初始化 this.client
     *
     * @override
     */
    Clipboard.prototype.initStructure = function () {

        if (!/Chrome/.test(navigator.userAgent)) {
            this.client = new ZeroClipboard(this.main);
            return;
        }

        var me = this;

        this.client = {
            on: function () {}
        };

        this.main.onclick = function () {
            document.oncopy = function (event) {
                me.fire('beforecopy');

                event.clipboardData.setData('text/plain', me.clipboardText);
                event.preventDefault();

                me.fire('aftercopy');
            };
            document.execCommand('Copy');
            document.oncopy = undefined;
        };
    };

    /**
     * 把 this.client 的事件代理处理，方便通过 .on('xxx') 的方式来处理，在事件的处理
     * 回调中，可以通过 e.originalEvent 来得到原生的事件对象
     *
     * @private
     * @param {string} type 需要代理的事件类型.
     * @return {Function} Event handler.
     */
    Clipboard.prototype.proxyEvent = function (type) {
        return u.bind(function (e) {
            if (type === 'copy') {
                if (this.clipboardText) {
                    var clipboard = e.clipboardData;
                    clipboard.setData('text/plain', this.clipboardText);
                }
            }

            this.fire(type, {originalEvent: e});
        }, this);
    };

    /**
     * 初始化事件
     *
     * @fires ready
     * @fires beforecopy
     * @fires copy
     * @fires aftercopy
     * @fires error
     */
    Clipboard.prototype.initEvents = function () {
        var nativeEvents = [
            'ready', 'beforecopy', 'copy', 'aftercopy', 'error'
        ];
        u.each(nativeEvents, function (evt) {
            this.client.on(evt, this.proxyEvent(evt));
        }, this);
    };

    require('esui').register(Clipboard);
    return Clipboard;
});
