/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');
    var constants = require('common/constants');
    var FormView = require('bat-ria/mvc/FormView');
    var utils = require('common/utils');
    var moment = require('moment');
    var config = require('./config');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherAddView() {
        FormView.apply(this, arguments);
    }

    VoucherAddView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherAddView.prototype.template = 'TPL_voucher_add';

    /**
     * @inheritDoc
     */
    VoucherAddView.prototype.uiProperties = {
        uploaderCover: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        },
        start_time: {
            timePicker: false
        },
        end_time: {
            timePicker: false
        },
        voucherType: {
            datasource: config.VOUCHER_TYPE_LIST
        }
    };

    VoucherAddView.prototype.uploadSuccess = function (e) {
        var originalEvent = e.originalEvent;
        var object = originalEvent.object;
        var ret = originalEvent.ret;
        if (ret && ret.success && ret.data) {
            this.showToast(object.file.name + '上传成功');
            // 将上传的结果保存到model中，在提交的时候进行保存
            this.model.get('formData').image_url = ret.data.url;
            document.getElementById('preview').innerHTML = '<img src="' + utils.imgUrl(ret.data.url,200,200) + '"/>';
        }
        else {
            var errorMessage = (object.file.name ? '“ ' + object.file.name + ' ”' : '')
                + (ret && ret.message && ret.message.global ? ret.message.global : '上传失败')
                + '，请重新上传！';
            e.target.showValidationMessage('invalid', errorMessage);
        }
        e.target.uploader.reset();

    };
    VoucherAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                isAgentVoucher: false
            },
            methods: {

            },
            ready: function () {
                if(me.model.get('formData').amount > 0 ){
                    this.$set('isAmount',true);
                }else{
                    this.$set('isAmount',false);
                }

                if(me.model.get('formData').start_time > 0 ){
                    this.$set('isTime',true);
                }else{
                    this.$set('isTime',false);
                }
                if(this.formData.type == config.VOUCHER_TYPE_AGENT){
                    this.isAgentVoucher = true;
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    VoucherAddView.prototype.uiEvents = {
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
        },
        'ispay:change':function (e) {
            if(e.target.getValue() == config.PAY_YES) {
                this.vue.isAmount = true;
            }
            else {
                this.vue.isAmount = false;
                this.get('amount').setValue(0);
            }
        },
        'islimited:change':function (e) {
            this.vue.isTime = e.target.getValue() == config.LIMITED_YES ? true : false;
            this.get('start_time').setProperties({
                value: moment().format('YYYY-MM-DD')
            });
            this.get('end_time').setProperties({
                value: moment().format('YYYY-MM-DD')
            });

        },
        'voucherType:change':function (e) {
            var isAgentVoucher = e.target.getValue() == config.VOUCHER_TYPE_AGENT ? true : false;
            this.get('ispay').setProperties({
                disabled: isAgentVoucher
            });
            this.get('islimited').setProperties({
                disabled: isAgentVoucher
            });
            this.vue.isAgentVoucher = isAgentVoucher;
        }
    };

    VoucherAddView.prototype.enterDocument = function () {
        FormView.prototype.enterDocument.apply(this, arguments);
        if(this.vue.formData.type == config.VOUCHER_TYPE_AGENT) {
            this.get('ispay').setProperties({
                disabled: true
            });
            this.get('islimited').setProperties({
                disabled: true
            });
        }

    };
    require('er/util').inherits(VoucherAddView, FormView);
    return VoucherAddView;
});
