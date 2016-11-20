/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./apply.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var constants = require('common/constants');
    var utils = require('common/utils');
    var api = require('common/config').api;



    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationWeixinpayView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayView.prototype.template = 'TPL_organization_weixinpay_apply';

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayView.prototype.uiProperties = {
        uploaderLicenceImgUrl: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        uploaderCodeImgUrl: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        uploaderIdentityCardFrontImgUrl: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        uploaderIdentityCardReverseImgUrl: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    OrganizationWeixinpayView.prototype.uploadSuccess = function (e,type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;

        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
             e.target.setValue(ret.data.url);
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

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayView.prototype.uiEvents = {
        'uploaderLicenceImgUrl:uploadAccept': function (e) {
            this.uploadSuccess(e, 'LicenceImgUrl');
        },
        'uploaderLicenceImgUrl:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderLicenceImgUrl:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
        },
        'uploaderLicenceImgUrl:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderLicenceImgUrl:error': function (e) {
            e.target.uploader.reset();
        },

        'uploaderCodeImgUrl:uploadAccept': function (e) {
            this.uploadSuccess(e, 'CodeImgUrl');
        },
        'uploaderCodeImgUrl:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderCodeImgUrl:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
        },
        'uploaderCodeImgUrl:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderCodeImgUrl:error': function (e) {
            e.target.uploader.reset();
        },

        'uploaderIdentityCardFrontImgUrl:uploadAccept': function (e) {
            this.uploadSuccess(e, 'IdentityCardFrontImgUrl');
        },
        'uploaderIdentityCardFrontImgUrl:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderIdentityCardFrontImgUrl:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
        },
        'uploaderIdentityCardFrontImgUrl:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderIdentityCardFrontImgUrl:error': function (e) {
            e.target.uploader.reset();
        },

        'uploaderIdentityCardReverseImgUrl:uploadAccept': function (e) {
            this.uploadSuccess(e, 'IdentityCardReverseImgUrl');
        },
        'uploaderIdentityCardReverseImgUrl:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploaderIdentityCardReverseImgUrl:uploadComplete': function (e) {
            e.target.setHint('上传完成，不满意可选择文件重新上传');
        },
        'uploaderIdentityCardReverseImgUrl:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploaderIdentityCardReverseImgUrl:error': function (e) {
            e.target.uploader.reset();
        },
        'submit:click': function () {
            if (!!this.model.get('formData')) {
                this.model.submitRequester = api.updateWeixinpay;
            }
            else {
                this.model.submitRequester = api.ennableWeixinpay;
            }
            this.fire('submit');
        }
    };


    require('er/util').inherits(OrganizationWeixinpayView, FormView);
    return OrganizationWeixinpayView;
});
