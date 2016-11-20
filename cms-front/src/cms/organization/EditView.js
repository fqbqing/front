/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./edit.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var constants = require('common/constants');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationEditView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationEditView.prototype.template = 'TPL_organization_edit';

    /**
     * @inheritDoc
     */
    OrganizationEditView.prototype.uiProperties = {
        uploader: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        agentSpread: {
            datasource: constants.AGENT_SPREAD_LIST
        },
        publicCustomers: {
            datasource: constants.SHOW_PUBLIC_CUSTOMER_LIST
        }

    };
    OrganizationEditView.prototype.uploadSuccess = function (e,type) {
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
    OrganizationEditView.prototype.uiEvents = {
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

    require('er/util').inherits(OrganizationEditView, FormView);
    return OrganizationEditView;
});
