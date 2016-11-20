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
    var u = require('underscore');
    var InputControl = require('esui/InputControl');
    var lib = require('esui/lib');

    window.ZeroClipboard = require('zeroclipboard');
    require('js!ueditor/ueditor.all.js');

    /**
     * 编辑器默认的配置信息
     * @type {{UEDITOR_HOME_URL: string, toolbars: *[]}}
     */
    var kDefaultEditorOptions = {
        // 如果配置了 urlArgs，那么后续用 UEDITOR_HOME_URL 拼接路径的时候就出问题了，因此把这个部分删掉
        UEDITOR_HOME_URL: require.toUrl('ueditor/').replace(/\?.*/, ''),
        autoFloatEnabled: false,
        toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough',
            'superscript', 'subscript', 'removeformat', 'formatmatch',
            'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor',
            'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music',
            'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak',
            'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow',
            'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown',
            'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'help', 'drafts'
        ]]
    };

    /**
     * 富文本编辑器，默认包装一下 ueditor 为 esui 控件，方便集成到系统
     * 里面去.
     *
     * @param {Object} options 控件的初始化参数.
     * @extends {Control}
     * @constructor
     */
    function RichTextEditor(options) {
        InputControl.call(this, options);

        /**
         * 编辑器的配置信息
         *
         *     @example
         *     <div data-ui-type="RichTextEditor"
         *          data-ui-editor-options="@editorOptions"></div>
         *
         * @type {Object}
         */
        this.editorOptions;

        /**
         * 编辑器初始化的内容，优先使用这个配置，如果没有配置的话，会考虑
         * this.main.innerHTML的内容
         *
         * @type {string}
         */
        this.editorContent;

        /**
         * @type {UE.ui.Editor}
         * @private
         */
        this.editor = null;
    }
    lib.inherits(RichTextEditor, InputControl);

    RichTextEditor.prototype.initOptions = function (options) {
        options = u.extend({
            // 默认使用 this.main.innerHTML
            // 当然也可以用过 data-ui-editor-content 来覆盖
            editorContent: this.main.innerHTML
        }, options);
        this.setProperties(options);
    };

    /**
     * 初始化 ueditor，因为 esui 的设计，只会执行一次
     * @override
     */
    RichTextEditor.prototype.initStructure = function () {
        var options = u.extend(kDefaultEditorOptions, this.editorOptions);
        options.textarea = lib.getGUID();
        this.main.innerHTML = '';
        /*eslint-disable*/
        this.editor = new UE.ui.Editor(options);
        this.editor.render(this.main);
        /*eslint-enable*/
    };

    RichTextEditor.prototype.initEvents = function () {
        var me = this;
        var editor = this.editor;
        var editorContent = u.trim(this.editorContent);

        editor.addListener('ready', function () {
            editor.setContent(editorContent);
        });
        editor.addListener('contentchange', function () {
            me.fire('change');
        });
    };

    /**
     * 返回当前编辑器的内容.
     *
     * @return {string}
     */
    RichTextEditor.prototype.getRawValue = function () {
        return this.editor.getContent();
    };

    RichTextEditor.prototype.setRawValue = function(str) {
        this.editor.setContent(str);
    };

    /**
     * 计算编辑器当前纯文本内容的长度
     * @param {boolean} ingoneHtml 传入true时，只按照纯文本来计算
     * @param {Array.<string>} tagNames 内容中有 tagNames 中声明的标签时，长度加1，默认是 ['hr', 'img', 'iframe']
     * @return {number}
     */
    RichTextEditor.prototype.getContentLength = function (ingoneHtml, tagNames) {
        return this.editor.getContentLength(ingoneHtml, tagNames);
    };

    /**
     * 控件的类型
     * @const
     * @type {string}
     */
    RichTextEditor.prototype.type = 'RichTextEditor';

    RichTextEditor.prototype.dispose = function () {
        if (this.helper.isInStage('DISPOSED')) {
            return;
        }

        if (this.editor) {
            var editor = this.editor;
            //this.editor.destroy();
            editor.fireEvent('destroy');
            if (editor.ui._fullscreen === true) {
                editor.ui.setFullScreen(false);
            }
            var container = editor.container.parentNode;
            var textarea = editor.textarea;
            if (textarea) {
                textarea.parentNode.removeChild(textarea);
            }
            container.innerHTML = '';
            container.parentNode.removeChild(container);
            //trace:2004
            for (var p in editor) {
                if (editor.hasOwnProperty(p)) {
                    delete this[p];
                }
            }
            UE.delEditor(editor.key);
        }

        InputControl.prototype.dispose.call(this);
    };

    require('esui').register(RichTextEditor);
    return RichTextEditor;
});







/* vim: set ts=4 sw=4 sts=4 tw=120: */
