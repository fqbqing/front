/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    var u = require('underscore');
    var $ = require('jquery');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ImageAddView() {
        BaseView.apply(this, arguments);
    }

    ImageAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    ImageAddView.prototype.template = 'TPL_image_add';

    /**
     * @inheritDoc
     */
    ImageAddView.prototype.uiProperties = {
        uploader: {
            uploaderOptions: {
                pick: {
                    multiple: false
                },
                server: '/api/image/upload',
                fileVal: 'upfile',
                chunked: false,
                threads: 1,
                dnd: '#dnd-area',
                disableGlobalDnd: true,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                auto: true,
                sendAsBinary: false,
                fileNumLimit: 1,
                fileSingleSizeLimit: 2 * 1024 * 1024
            }
        },
        uploaderMobile: {
            uploaderOptions: {
                pick: {
                    multiple: false
                },
                server: '/api/image/upload',
                fileVal: 'upfile',
                chunked: false,
                threads: 1,
                //dnd: '#dnd-mobile-area',
                //disableGlobalDnd: true,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                auto: true,
                sendAsBinary: false,
                fileNumLimit: 1,
                fileSingleSizeLimit: 5 * 1024 * 1024
            }
        }
    };

    ImageAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                image_id: ''
            },
            methods: {
            }
        };
    };

    ImageAddView.prototype.uploadSuccess = function (e) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            this.vue.image_id = ret.data.id;
            this.get('preview').setContent('<img src="' + ret.data.url + '"/>');

            this.get('uploaderMobile').enable();
            var mobile = this.get('uploaderMobile').getNative();
            mobile.option('formData', {
                pc_image_id: ret.data.id
            });
            $('.upload-mobile-image').removeClass('upload-mobile-image-hidden');
        }
        else {
            var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                + (ret && ret.message && ret.message.global ? ret.message.global : '上传失败')
                + '，请重新上传！';
            e.target.showValidationMessage('invalid', errorMessage);
        }
        e.target.uploader.reset();
    };

    ImageAddView.prototype.uploadMobileSuccess = function (e) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            this.get('previewMobile').setContent('<img src="' + ret.data.url + '"/>');
        }
        else {
            var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                + (ret && ret.message && ret.message.global ? ret.message.global : '上传失败')
                + '，请重新上传！';
            e.target.showValidationMessage('invalid', errorMessage);
        }
        e.target.uploader.reset();
    };

    /**
     * @inheritDoc
     */
    ImageAddView.prototype.uiEvents = {
        'uploader:uploadAccept': function (e) {
            this.uploadSuccess(e);
        },
        'uploader:uploadStart': function (e) {
            e.target.setHint('上传中……');
            // 重置移动版图片关联
            this.get('previewMobile').setContent('');
            this.vue.image_id = '';
            var target = this.get('uploaderMobile');
            target.disable();
            target.setHint('');
            $('.upload-mobile-image').addClass('upload-mobile-image-hidden');
        },
        'uploader:uploadComplete': function (e) {
            e.target.setHint('上传完成，可重新上传');
        },
        'uploaderMobile:uploadAccept': function (e) {
            this.uploadMobileSuccess(e);
        },
        'uploaderMobile:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderMobile:uploadComplete': function (e) {
            e.target.setHint('上传完成，可重新上传');
        }
    };

    ImageAddView.prototype.enterDocument = function () {
        BaseView.prototype.enterDocument.apply(this, arguments);
        var mobile = this.get('uploaderMobile');
        if(this.model.get('id')){
            var mobile = mobile.getNative();
            mobile.option('formData', {
                pc_image_id: this.model.get('id')
            });
            $('.upload-mobile-image').removeClass('upload-mobile-image-hidden');
         /*   this.get('previewMobile').setContent('<img src="' + ret.data.url + '"/>');*/
        }else{
            mobile.disable();
        }
    };

    require('er/util').inherits(ImageAddView, BaseView);
    return ImageAddView;
});
