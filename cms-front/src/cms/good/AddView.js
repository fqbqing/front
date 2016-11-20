/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodAddView() {
        FormView.apply(this, arguments);
    }

    GoodAddView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    GoodAddView.prototype.template = 'TPL_good_add';


    /**
     * @inheritDoc
     */
    GoodAddView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        uploaderImage: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    GoodAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                category: me.model.get('formData').category || {},
                tags: me.model.get('formData').tags || [],
                specifications: me.model.get('formData').specifications || [],
                images: me.model.get('formData').images || [],
                details: me.model.get('formData').details || []
            },
            ready: function () {
                if (this.details.length === 0) {
                    this.details.push({
                        title: '车型详解',
                        content: ''
                    });
                }
            },
            methods: {
                removeSelectedTag: function (tag) {
                    this.tags.splice(u.findIndex(this.tags, {
                        id: tag.id
                    }), 1);
                },
                removeSelectedSpec: function (spec) {
                    this.specifications.splice(u.findIndex(this.specifications, {
                        id: spec.id
                    }), 1);
                },
                removeImage: function (image) {
                    this.images.splice(u.findIndex(this.images, {
                        id: image.id
                    }), 1);
                },
                removeDetail: function (idx) {
                    this.details.splice(idx, 1);
                }
            }
        };
    };

    /**
     * 获取当前表单需要提交的额外数据
     *
     * @return {Object} 表单数据
     */
    GoodAddView.prototype.getExtraFormData = function () {
        var vue = this.vue;
        var details = [];
        u.each(vue.details, function (item) {
            var detail = {
                title: item.title,
                content: item.content
            };
            if (item.id) {
                detail.id = item.id;
            }
            details.push(detail);
        });

        var tag_ids = u.pluck(vue.tags, 'id');
        var specification_ids = u.pluck(vue.specifications, 'id');
        var image_ids = u.pluck(vue.images, 'id');
        return {
            category_id: vue.category.id,
            details: JSON.stringify(details),
            tag_ids: tag_ids.join(','),
            specification_ids: specification_ids.join(','),
            image_ids: image_ids.join(','),
            image_default_id: this.model.get('formData').image_default_id
        };
    };

    GoodAddView.prototype.uploadSuccess = function (e, type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');

            if (type === 'cover') {
                // 将上传的结果保存到model中，在提交的时候进行保存
                this.model.get('formData').image_default_id = ret.data.id;
                document.getElementById('preview' + type).innerHTML = '<img src="' + ret.data.url + '"/>';
            }
            else {
                this.vue.images.push({
                    id: ret.data.id,
                    url: ret.data.url
                });
            }
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
    GoodAddView.prototype.uiEvents = {
        'uploaderCover:uploadAccept': function (e) {
            this.uploadSuccess(e, 'cover');
        },
        'uploaderCover:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderCover:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
        },
        'uploaderImage:uploadAccept': function (e) {
            this.uploadSuccess(e, 'image');
        },
        'uploaderImage:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderImage:uploadComplete': function (e) {
            e.target.setHint('上传完成，可继续上传其他图片');
        },
        'chooseTag:click': function () {
            this.fire('chooseTag');
        },
        'chooseSpec:click': function () {
            this.fire('chooseSpec');
        },
        'chooseCategory:click': function () {
            this.fire('chooseCategory');
        },
        'addDetails:click': function () {
            this.vue.details.push({
                title: '',
                content: ''
            });
        }
    };

    require('er/util').inherits(GoodAddView, FormView);
    return GoodAddView;
});
