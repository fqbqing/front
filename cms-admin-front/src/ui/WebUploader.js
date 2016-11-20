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
    var InputControl = require('esui/InputControl');
    var lib = require('esui/lib');
    var u = require('underscore');

    require('css!webuploader/webuploader.css');
    var Uploader = require('webuploader');

    /**
     * Uploader默认的配置信息
     * @type {Object}
     */
    var kDefaultUploaderOptions = {
        swf: require.toUrl('webuploader/Uploader.swf'),
        disableWidgets: 'log'   // 禁用log统计
    };

    /**
     * 错误发生之后的提示信息.
     * @type {Object}
     */
    var kDefaultErrorMessages = {
        F_EXCEED_SIZE: '文件大小超出限制！',
        Q_EXCEED_NUM_LIMIT: '队列文件数量超出限制！',
        Q_EXCEED_SIZE_LIMIT: '队列文件总量大小超出限制！',
        Q_ZERO_SIZE_LIMIT: '不支持0字节的文件上传',
        Q_TYPE_DENIED: '不支持 “${name}” 的文件类型 “${ext}”',
        F_DUPLICATE: '文件 “${name}” 已存在'
    };

    /**
     * 封装一下 http://fex.baidu.com/webuploader/，方便在系统中直接使用
     * @param {Object} options 控件初始化参数.
     * @constructor
     * @extends {InputControl}
     */
    function WebUploader(options) {
        InputControl.call(this, options);

        /**
         * 控件初始化的时候，传递给 Uploader 的参数
         * <div data-ui-uploader-options="@uploaderOptions"></div>
         * @private
         * @type {Object}
         */
        this.uploaderOptions;

        /**
         * @private
         * @type {Uploader}
         */
        this.uploader;
    }
    lib.inherits(WebUploader, InputControl);

    WebUploader.prototype.initOptions = function (options) {
        var properties = {
            uploaderOptions: {},
            label: lib.getText(this.main) || '上传'
        };
        u.extend(properties, options);

        this.setProperties(properties);
    };

    WebUploader.prototype.initStructure = function () {
        var pickId = this.helper.getId('pick');
        var pickClass = this.helper.getPartClassName('pick');

        this.main.innerHTML = lib.format(
            '<div id="${pickId}" class="${pickClass}"></div>',
            {pickId: pickId, pickClass: pickClass}
        );

        var defaultPickOptions = {
            id: this.helper.getPart('pick'),
            label: this.label
        };
        this.uploaderOptions.pick = u.extend({},
            this.uploaderOptions.pick, defaultPickOptions);
        var options = u.extend({}, kDefaultUploaderOptions, this.uploaderOptions);

        this.uploader = Uploader.create(options);
    };

    WebUploader.prototype.initEvents = function () {
        var uploader = this.uploader;
        var nativeEvents = {
            dndAccept: ['items'],
            beforeFileQueued: ['file'],
            fileQueued: ['file'],
            filesQueued: ['files'],
            fileDequeued: ['file'],
            reset: [],
            startUpload: [],
            stopUpload: [],
            uploadFinished: [],
            uploadStart: ['file'],
            uploadBeforeSend: ['object', 'data', 'headers'],
            uploadAccept: ['object', 'ret', 'fn', 'xhr'],
            uploadProgress: ['file', 'percentage'],
            uploadError: ['file', 'reason'],
            uploadSuccess: ['file', 'response'],
            uploadComplete: ['file'],
            error: ['type']
        };
        u.each(nativeEvents, function (args, evt) {
            uploader.on(evt, this.proxyEvent(args, evt));
        }, this);

        this.on('error', function (e) {
            var originalEvent = e.originalEvent;
            var type = originalEvent.type;
            var errorMessage = kDefaultErrorMessages[type] || type;
            if (originalEvent.file) {
                errorMessage = lib.format(errorMessage, originalEvent.file);
            }

            e.target.showValidationMessage('invalid', errorMessage);
        });

        this.on('uploadBeforeSend', function (e) {
            var originalEvent = e.originalEvent;
            var object = originalEvent.object;
            var headers = originalEvent.headers;

            headers['File-Name'] = encodeURIComponent(object.file.name);
            headers['X-Request-By'] = 'ERApplication';
            //headers['Content-Type'] = object.file.type;
        });

        this.on('beforeFileQueued', function (e) {
            if (!e.target.validate()) {
                e.preventDefault();
            }
        });

        if (!this.skipUploadAccept) {
            this.on('uploadAccept', function (e) {
                var originalEvent = e.originalEvent;
                var object = originalEvent.object;
                var ret = originalEvent.ret;
                var xhr = originalEvent.xhr;

                if (!(ret && ret.success && ret.data)) {
                    // 上传失败了
                    var file = object.file;
                    if (file && file.setStatus) {
                        file.setStatus('error', 'server error');
                    }
                    e.preventDefault();
                }
            });
        }
    };

    WebUploader.prototype.disable = function () {
        InputControl.prototype.disable.call(this);
        this.uploader.disable();

        // TODO(leeight) this.uploader 没有接口去获取 input[type=file]，因此
        // 只好遍历了
        u.each(this.main.getElementsByTagName('input'), function (input) {
            if (lib.hasClass(input, 'webuploader-element-invisible')) {
                input.disabled = true;
            }
        });
    };

    WebUploader.prototype.enable = function () {
        InputControl.prototype.enable.call(this);
        this.uploader.enable();

        // TODO(leeight) this.uploader 没有接口去获取 input[type=file]，因此
        // 只好遍历了
        u.each(this.main.getElementsByTagName('input'), function (input) {
            if (lib.hasClass(input, 'webuploader-element-invisible')) {
                input.disabled = false;
            }
        });
    };

    /**
     * @private
     * @param {Array.<string>} args 参数的名字列表
     * @param {string} type 事件类型.
     * @return {Function} Event handler.
     */
    WebUploader.prototype.proxyEvent = function (args, type) {
        return u.bind(function () {
            if (type === 'beforeFileQueued') {
                // 记录一下这个文件，验证的时候会用到
                this._beforeQueuedFile = arguments[0];
            }
            else if (type === 'error') {
                switch (arguments[0]) {
                    case 'Q_TYPE_DENIED':
                    case 'F_DUPLICATE':
                        args = ['type', 'file'];
                        break;
                    case 'Q_EXCEED_NUM_LIMIT':
                    case 'Q_EXCEED_SIZE_LIMIT':
                    case 'F_EXCEED_SIZE':
                        args = ['type', 'max', 'file'];
                        break;
                }
            }

            var evt = this.fire(type, {originalEvent: u.object(args, arguments)});
            // 处理 beforeFileQueued 事件
            // 当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。
            // 处理 uploadAccept 事件
            // 如果此事件handler返回值为false, 则此文件将派送server类型的uploadError事件
            if (evt.isDefaultPrevented()) {
                return false;
            }
        }, this);
    };

    /**
     * 触发 beforeFileQueued 事件的时候，会记录一下需要加入到队列的那个文件，后续
     * 如果某些验证规则需要用到这个文件的信息，可以调用这个方法来获取
     *
     * @return {{size: number, name: string, __hash: string}}
     */
    WebUploader.prototype.getBeforeQueuedFile = function () {
        return this._beforeQueuedFile;
    };

    WebUploader.prototype.getNative = function () {
        return this.uploader;
    };

    WebUploader.prototype.setHint = function (text) {
        this.setProperties({
            hint: text
        });
    };

    WebUploader.prototype.repaint = require('esui/painters').createRepaint(
        InputControl.prototype.repaint,
        {
            name: ['hint', 'hintType'],
            paint: function (ctrl, hint, hintType) {
                var label = ctrl.helper.getPart('hint');

                ctrl.removeState('hint-prefix');
                ctrl.removeState('hint-suffix');

                if (!hint && label) {
                    lib.removeNode(label);
                }

                if (hint) {
                    if (!label) {
                        label = document.createElement('label');
                        label.id = ctrl.helper.getId('hint');
                        ctrl.helper.addPartClasses('hint', label);
                        lib.setAttribute(label, 'for', ctrl.helper.getId('pick'));
                    }

                    label.innerHTML = u.escape(hint);
                    hintType = hintType === 'prefix' ? 'prefix' : 'suffix';
                    var method = hintType === 'prefix'
                        ? 'insertBefore'
                        : 'insertAfter';
                    lib[method](label, ctrl.helper.getPart('pick'));

                    ctrl.addState('hint-' + hintType);
                }
            }
        }
    );

    WebUploader.prototype.dispose = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }

        if (this.uploader) {
            this.uploader.destroy();
        }

        InputControl.prototype.dispose.call(this);
    };

    /**
     * 控件的类型
     * @const
     * @type {string}
     */
    WebUploader.prototype.type = 'WebUploader';

    require('esui').register(WebUploader);

    return WebUploader;
});





/* vim: set ts=4 sw=4 sts=4 tw=120: */
