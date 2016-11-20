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
    function GoodCategoryAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodCategoryAddView.prototype.template = 'TPL_good_category_add';

    /**
     * @inheritDoc
     */
    GoodCategoryAddView.prototype.uiProperties = {
        uploader: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    GoodCategoryAddView.prototype.uploadSuccess = function (e) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');

            // 将上传的结果保存到model中，在提交的时候进行保存
            this.model.set('image_id', ret.data.id);
            this.get('preview').setContent('<img src="' + ret.data.url + '"/>');
        }
        else {
            var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                + (ret && ret.message && ret.message.global ? ret.message.global : '上传失败')
                + '，请重新上传！';
            e.target.showValidationMessage('invalid', errorMessage);
            e.target.uploader.reset();
        }

    };

    /**
     * @inheritDoc
     */
    GoodCategoryAddView.prototype.uiEvents = {
        'uploader:uploadAccept': function (e) {
            this.uploadSuccess(e);
        },
        'uploader:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploader:uploadComplete': function (e) {
            e.target.setHint('上传完成');
        }
    };

    require('er/util').inherits(GoodCategoryAddView, FormView);
    return GoodCategoryAddView;
});
