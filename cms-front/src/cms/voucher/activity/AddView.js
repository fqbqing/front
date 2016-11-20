/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');
    var cons = require('common/constants');
    var FormView = require('bat-ria/mvc/FormView');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherActivityAddView() {
        FormView.apply(this, arguments);
    }

    VoucherActivityAddView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherActivityAddView.prototype.template = 'TPL_voucher_activity_add';

    /**
     * @inheritDoc
     */
    VoucherActivityAddView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: cons.BASE_UPLOAD_CONFIG
        }
    };

    VoucherActivityAddView.prototype.uploadSuccess = function (e,type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            // 将上传的结果保存到model中，在提交的时候进行保存
            //var share_image_url = cons.CDN_URL + ret.data.url;
            this.model.get('formData').share_image_url = ret.data.url;
            document.getElementById('preview').innerHTML = '<img src="' + utils.imgUrl(ret.data.url, 200, 200) + '"/>';
        }
        else {
            var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                + (ret && ret.message && ret.message.global ? ret.message.global : '上传失败')
                + '，请重新上传！';
            e.target.showValidationMessage('invalid', errorMessage);
        }
        e.target.uploader.reset();

    };
    VoucherActivityAddView.prototype.getVueOptions = function () {
        return {
            data: {

            },
            methods: {

            }
        };
    };
    /**
     * @inheritDoc
     */
    VoucherActivityAddView.prototype.uiEvents = {
        'uploaderCover:uploadAccept': function (e) {
            this.uploadSuccess(e);
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
        }
    };

    require('er/util').inherits(VoucherActivityAddView, FormView);
    return VoucherActivityAddView;
});
