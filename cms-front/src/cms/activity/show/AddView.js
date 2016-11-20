/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');
    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    var cons = require('common/constants');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ActivityShowAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ActivityShowAddView.prototype.template = 'TPL_activity_show_add';

    ActivityShowAddView.prototype.uploadSuccess = function (e) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            // 将上传的结果保存到model中，在提交的时候进行保存
            if(this.model.get('formData').id){
                this.model.get('formData').activity.image_default_id = ret.data.id;
            }else{
                this.model.set("image",ret.data.id);
            }
            document.getElementById('preview').innerHTML = '<img src="' + ret.data.url + '"/>';
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
    ActivityShowAddView.prototype.uiProperties = {
        showType: {
            datasource: cons.ACTIVITY_TYPE_LIST
        },
        uploader: {
            uploaderOptions: cons.BASE_UPLOAD_CONFIG
        }
    };

    /**
     * @inheritDoc
     */
    ActivityShowAddView.prototype.uiEvents = {
        'uploader:uploadAccept': function (e) {
            this.uploadSuccess(e);
        },
        'uploader:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploader:uploadComplete': function (e) {
            e.target.setHint('上传完成');
        },
        'chooseActivityBtn:click': function(e){
            this.fire('chooseActivity');
        }

    };



    require('er/util').inherits(ActivityShowAddView, FormView);
    return ActivityShowAddView;
});
