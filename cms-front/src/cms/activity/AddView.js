/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');
    var constants = require('common/constants');
    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    //var $ = require('jquery');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ActivityAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ActivityAddView.prototype.template = 'TPL_activity_add';

    /**
     * @inheritDoc
     */
    ActivityAddView.prototype.uiProperties = {
        amountType: {
            selectedIndex: 0,
            datasource: [
                {
                    name: '折扣',
                    value: 'multiply'
                },
                {
                    name: '一口价',
                    value: 'replace'
                }
            ]
        },
        depositType: {
            selectedIndex: 0,
            datasource: [
                {
                    name: '百分比',
                    value: 'multiply'
                },
                {
                    name: '固定值',
                    value: 'replace'
                }
            ]
        },
        uploader: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    /**
     * 获取当前表单需要提交的额外数据
     *
     * @return {Object} 表单数据
     */
    ActivityAddView.prototype.getExtraFormData = function () {
        var me = this;
        return {
            amountType: me.get('amountType').getValue(),
            depositType: me.get('depositType').getValue()
        };
    };

    ActivityAddView.prototype.setExtraFormData = function (formData) {
        var me = this;
        var price_strategy = formData.price_strategy;
        u.each(price_strategy, function (strategy) {
            var id = strategy.newField;
            var text = me.get(id);
            if (text) {
                text.setValue(strategy.param);
                me.get(id + 'Type').setValue(strategy.operator);
            }
        });
    };

    ActivityAddView.prototype.uploadSuccess = function (e) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');

            // 将上传的结果保存到model中，在提交的时候进行保存
            this.model.get('formData').image_default_id = ret.data.id;
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
    ActivityAddView.prototype.uiEvents = {
        'uploader:uploadAccept': function (e) {
            this.uploadSuccess(e);
        },
        'uploader:uploadStart': function (e) {
            e.target.setHint('上传中……');
        },
        'uploader:uploadComplete': function (e) {
            e.target.setHint('上传完成');
        },
        'amountType:change': function (e) {
            var multiply = this.get('amountMultiplyLabel');
            var replace = this.get('amountReplaceLabel');
            if (e.index === 0) {
                multiply.show();
                replace.hide();
            }
            else {
                multiply.hide();
                replace.show();
            }
        },
        'depositType:change': function (e) {
            var multiply = this.get('depositMultiplyLabel');
            var replace = this.get('depositReplaceLabel');
            if (e.index === 0) {
                multiply.show();
                replace.hide();
            }
            else {
                multiply.hide();
                replace.show();
            }
        }
    };

    ActivityAddView.prototype.enterDocument = function () {
        FormView.prototype.enterDocument.apply(this, arguments);
        this.setExtraFormData(this.model.get('formData'));
    };

    require('er/util').inherits(ActivityAddView, FormView);
    return ActivityAddView;
});
