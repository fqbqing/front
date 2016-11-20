/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var utils = require('common/utils');
    var $ = require('jquery');
    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationAddView() {
        FormView.apply(this, arguments);
    }
    OrganizationAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationAddView.prototype.template = 'TPL_organization_add';

    /**
     * @inheritDoc
     */
    OrganizationAddView.prototype.uiProperties = {
        uploader: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    OrganizationAddView.prototype.getVueOptions = function () {
        return {
            data: {
                cityName: ''
            }

        };
    };

    OrganizationAddView.prototype.uploadSuccess = function (e,type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            e.target.setValue(ret.data.url);
            document.getElementById('preview').innerHTML = '<img src="' + ret.data.url + '" alt="预览图片" class="logo"/>';
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
    OrganizationAddView.prototype.uiEvents = {
        'level_expire_time:change': function (e) {
            var start_time = parseInt((new Date()).getTime() / 1000,10);
            var end_time =  moment().add(e.target.getValue(), 'months').unix();
            this.get('expire_time_text').setText('(' + utils.dateFormat(start_time,'YYYY.MM.DD') + '-' + utils.dateFormat(end_time,'YYYY.MM.DD') + ')');
        },
        'distribute:click': function (e) {
            this.fire('distribute');
        },
        'chooseCity:click': function (e) {
            this.fire('chooseCity');

        },
        'uploader:uploadAccept': function (e) {
            this.uploadSuccess(e);
        },
        'uploader:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploader:uploadError': function (e) {
            e.target.uploader.reset();
        },
        'uploader:error': function (e) {
            e.target.uploader.reset();
        },
        'uploader:uploadComplete': function (e) {
            e.target.setHint('上传完成，可继续上传其他图片');
        }
    };

    require('er/util').inherits(OrganizationAddView, FormView);
    return OrganizationAddView;
});
