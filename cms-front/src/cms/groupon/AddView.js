/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    var Deferred = require('er/Deferred');


    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GrouponAddView() {
        FormView.apply(this, arguments);
    }

    GrouponAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GrouponAddView.prototype.template = 'TPL_groupon_add';

    /**
     * @inheritDoc
     */
    GrouponAddView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: '@constants.BASE_UPLOAD_CONFIG'
        },
        uploaderShare: {
            uploaderOptions: '@constants.BASE_UPLOAD_CONFIG'
        },
        grouponType: {
            datasource: '@config.GROUPON_TYPE_LIST'
        },
        agentSpread: {
            datasource: [{
                name: '允许经纪人推广该活动',
                value: '1'
            }, {
                name: '不允许经纪人推广该活动',
                value: '0'
            }]
        }
    };

    GrouponAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                grouponType: 'free',
                agent_spread: 0
            },
            ready: function () {
                this.grouponType = this.config.GROUPON_TYPE_FREE;
                this.agent_spread = this.constants.AGENT_SPREAD_NO;
                if (this.formData && this.formData.agent_spread) {
                    this.agent_spread = this.formData.agent_spread;
                }
            },
            methods: {
            }
        };
    };

    GrouponAddView.prototype.uploadSuccess = function (e, type) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            document.getElementById('preview' + type).innerHTML = '<img src="' + ret.data.url + '"/>';
            e.target.setValue(ret.data.url);
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
    GrouponAddView.prototype.uiEvents = {
        'grouponType:change': function (e) {
            this.getVue().grouponType = e.item.value;
        },
        'agentSpread:change':function (e) {
            this.getVue().agent_spread = e.item.value;
        },
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
        },
        'submit:click': function() {
            //this.get('actionPanel').action.view.disableSubmit();
            this.fire('submit');

        }
    };

    GrouponAddView.prototype.enterDocument = function () {
        FormView.prototype.enterDocument.apply(this, arguments);
        var grouponType = this.get('grouponType');
        if (this.model.get('formData').intention) {
            grouponType.setSelectedIndex(1);
        }
        if (this.model.get('organization').agent_spread == this.model.get('constants').AGENT_SPREAD_YES || (this.model.get('formData').agentAwards && this.model.get('formData').agentAwards.length)) {
            this.get('actionPanel').setProperties({
                actionOptions: {
                    signupAward: this.model.get('signupAward'),
                    dealAward: this.model.get('dealAward')
                }
            });
        }
    };
    GrouponAddView.prototype.getExtraFormData = function () {
        var me = this;
        var param = {};
        if (this.vue.agent_spread == this.model.get('constants').AGENT_SPREAD_YES) {
            var extraFormData = me.get('actionPanel').action.view.getSubmitData();
            u.extend(param, extraFormData);
        }
        return param;
    };
    require('er/util').inherits(GrouponAddView, FormView);
    return GrouponAddView;
});
