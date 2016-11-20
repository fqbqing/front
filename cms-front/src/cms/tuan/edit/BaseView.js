/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./base.tpl.html');
    var constants = require('common/constants');
    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanEditBaseView() {
        FormView.apply(this, arguments);
    }
    TuanEditBaseView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */

    TuanEditBaseView.prototype.template = 'TPL_tuan_edit_base';

    /**
     * @inheritDoc
     */
    TuanEditBaseView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        uploaderShare: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    TuanEditBaseView.prototype.getExtraFormData = function () {
        var param = {
        };
        var characteristics = [];
        for(var i = 0;i < this.model.get('formData').characteristics.length;i++){
            characteristics.push(this.get('character-title'+i).getValue()+':'+this.get('character-content'+i).getValue());
        }
        param.characteristics = characteristics.join('\n');
        return param;
    };

    TuanEditBaseView.prototype.uploadSuccess = function (e,type) {
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

    TuanEditBaseView.prototype.getVueOptions = function () {
        return {
            data: {
                selectedName: this.model.get('formData').theme
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
    TuanEditBaseView.prototype.uiEvents = {
        'uploaderCover:uploadAccept': function (e) {
            console.log(e.target.uploader);
            this.uploadSuccess(e, 'cover');
        },
        'uploaderCover:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderCover:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderCover:error': function (e) {
            e.target.uploader.reset();
        },
        'uploaderCover:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
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

    require('er/util').inherits(TuanEditBaseView, FormView);
    return TuanEditBaseView;
});
