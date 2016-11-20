/**
 * Created by lifayu on 16/6/15.
 */
define(function (require) {

    var Vue = require('vue');
    var $ = require('jquery');
    var u = require('underscore');

    function setFocus(el) {
        if(document.selection) {
            var range = document.selection.createRange();
            range.moveToElementText(el);
            range.select();
            document.selection.empty(); //取消选中
        }
        else {
            var range = document.createRange();
            range.selectNodeContents(el);
            //range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    var EditableContent = {
        replace: true,
        props: {
            content: {
                type: String,
                default: function () {
                    return '';
                }
            }
        },
        template: '<article class="contenteditable-wrap" tabindex="1" :class="{contenteditable:contenteditable}" :contenteditable="contenteditable" @focus="focus" @blur="blur" v-html="content"></article>',
        data: function () {
            return {
                contenteditable: false
            };
        },
        methods: {
            focus: function () {
                this.contenteditable = true;
                //this.$el.focus();
                setFocus(this.$el);
            },
            blur: function () {
                this.contenteditable = false;
                // 删除多余的html标签，将起时标签变为换行`br`
                this.content = this.$el.innerHTML.replace(/<\w+(\s)*([^>])*>/g, '<br>').replace(/<\/\w+>/g, '');
            }
        },
        ready: function () {
        },
        destroyed: function () {
        }
    };

    Vue.component('editable-content', EditableContent);


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
    var EditableImage = {
        replace: true,
        props: {
            src: {
                type: String,
                default: function () {
                    return '';
                }
            }
        },
        template: '<div class="imageeditable-wrap"><img :src="src"><div class="uploader"></div><div class="tips"></div></div>',
        data: function () {
            return {};
        },
        methods: {
        },
        ready: function () {
            var me = this;
            var $tips = $('.tips', this.$el);
            var uploaderOptions = {
                pick: {
                    id: $('.uploader', this.$el)[0],
                    label: '选择图片',
                    multiple: false
                },
                server: '/api/image/upload',
                fileVal: 'upfile',
                chunked: false,
                threads: 1,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                auto: true,
                sendAsBinary: false,
                fileNumLimit: 1,
                fileSingleSizeLimit: 2 * 1024 * 1024
            };
            var options = u.extend({}, kDefaultUploaderOptions, uploaderOptions);

            var uploader = Uploader.create(options);

            uploader.on('error', function (type) {
                var errorText = kDefaultErrorMessages[type] || '未知错误';
                $tips.html('<span style="color: #ff1818;">' + errorText + '</span>').show();
            });

            uploader.on('uploadAccept', function (object, ret, fn, xhr) {
                $tips.hide();
                uploader.enable();
                if (ret && ret.success && ret.data) {
                    //this.showToast(object.file.name + '上传成功');
                    //this.get('preview').setContent('<img src="' + ret.data.url + '"/>');
                    me.src = ret.data.url;
                }
                else {
                    var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                        + (ret && ret.message ? ret.message : '上传失败')
                        + '，请重新上传！';
                    $tips.html('<span style="color: #ff1818;">' + errorMessage + '</span>').show();
                }
                uploader.reset();
            });

            uploader.on('uploadStart', function () {
                uploader.disable();
                $tips.html('<span>上传中……</span>').show();
            });

            this.uploader = uploader;
        },
        destroyed: function () {
            if (this.uploader) {
                this.uploader.destroy();
            }
        }
    };

    Vue.component('editable-image', EditableImage);

    var EditComponent = {
        replace: true,
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                default: function () {
                    return 0;
                }
            }
        },
        template: [
            '<div class="edit-component"><slot></slot>',
            '<div class="bar">',
            '   <button type="button" @click="moveTop" v-if="index>0" :disabled="index==0">上移</button>',
            '   <button type="button" @click="moveBottom">下移</button>',
            '   <button type="button" @click="appendItem">复制</button>',
            '   <button type="button" @click="removeItem">删除</button>',
            '</div>',
            '</div>'
        ].join(''),
        data: function () {
            return {
            };
        },
        methods: {
            moveTop: function () {
                this.$dispatch('MOVE_TOP_COMPONENT_ITEM', this.item);
            },
            moveBottom: function () {
                this.$dispatch('MOVE_BOTTOM_COMPONENT_ITEM', this.item);
            },
            appendItem: function () {
                this.$dispatch('APPEND_COMPONENT_ITEM', this.item);
            },
            removeItem: function () {
                this.$dispatch('REMOVE_COMPONENT_ITEM', this.item);
            }
        }
    };

    Vue.component('edit-component', EditComponent);

    return {};
});