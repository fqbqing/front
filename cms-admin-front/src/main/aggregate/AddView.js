/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');
    var cons = require('common/constants');
    var utils = require('common/utils');
    var URL = require('er/URL');
    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AggregateAddView() {
        FormView.apply(this, arguments);
    }

    AggregateAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AggregateAddView.prototype.template = 'TPL_aggregate_add';

    /**
     * @inheritDoc
     */
    AggregateAddView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: cons.BASE_UPLOAD_CONFIG
        }
    };

    AggregateAddView.prototype.uploadSuccess = function (e, type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            // 将上传的结果保存到model中，在提交的时候进行保存
            this.model.get('formData').image_id = ret.data.id;
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
    AggregateAddView.prototype.getVueOptions = function () {
        return {
            data: {}
        };
    };
    /**
     * @inheritDoc
     */
    AggregateAddView.prototype.uiEvents = {
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
        'makeChanel:click': function (e) {
            var url = this.get('url').getValue();
            if (!!url.trim() && utils.isURL(url)) {
                var url_query = URL.parse(url, {
                    querySeparator: '?'
                }).getQuery();
                url_query.source = this.model.get('aggregate_channel');
                this.get('url').setValue(URL.withQuery(
                    URL.parse(url, {
                        querySeparator: '?'
                    }).getPath(), url_query, {
                        querySeparator: '?'
                    }).toString());
            }
            else {
                this.alert('推广链接不合法');
            }
        }
    };

    require('er/util').inherits(AggregateAddView, FormView);
    return AggregateAddView;
});
