/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');
    var constants = require('common/constants');
    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanAddView() {
        FormView.apply(this, arguments);
    }
    TuanAddView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    TuanAddView.prototype.template = 'TPL_tuan_add';


    /**
     * @inheritDoc
     */
    TuanAddView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        uploaderShare: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    TuanAddView.prototype.getExtraFormData = function () {
        var param = {
        };
        var characteristics = [];
        characteristics.push(this.get('character-title0').getValue()+':'+this.get('character-content0').getValue());
        characteristics.push(this.get('character-title1').getValue()+':'+this.get('character-content1').getValue());
        param.characteristics = characteristics.join('\n');
        return param;
    };

    TuanAddView.prototype.uploadSuccess = function (e,type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            if (type === 'cover') {
                // 将上传的结果保存到model中，在提交的时候进行保存
                this.model.get('formData').image_default_id = ret.data.id;
            } else {
                this.model.get('formData').share_image_id = ret.data.id;
            }
            document.getElementById('preview' + type).innerHTML = '<img src="' + ret.data.url + '"/>';
        }
        else {
            var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                + (ret && ret.message && ret.message.global ? ret.message.global : '上传失败')
                + '，请重新上传！';
            e.target.showValidationMessage('invalid', errorMessage);
        }
        e.target.uploader.reset();

    };
    TuanAddView.prototype.getVueOptions = function () {
        return {
            data: {
             /*   is_coupon: true,*/
                selectedName: this.model.get('themes')[0].name
            },
            methods: {
                selectTheme: function(item){
                    this.selectedName = item.name;
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    TuanAddView.prototype.uiEvents = {
        'uploaderCover:uploadAccept': function (e) {
            this.uploadSuccess(e, 'cover');
        },
        'uploaderCover:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderCover:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
        },
        'uploaderCover:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderCover:error': function (e) {
            e.target.uploader.reset();
        },
        'uploaderShare:uploadAccept': function (e) {
            this.uploadSuccess(e, 'share');
        },
        'uploaderShare:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderShare:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderShare:error': function (e) {
            e.target.uploader.reset();
        },
        'uploaderShare:uploadComplete': function (e) {
            e.target.setHint('上传完成，可继续上传其他图片');
        }
    };

    require('er/util').inherits(TuanAddView, FormView);
    return TuanAddView;
});
