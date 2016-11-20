/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./description.tpl.html');
    var constants = require('common/constants');
    var FormView = require('bat-ria/mvc/FormView');
    var utils = require('common/utils');
    require('ui-vue/EditableContent');
    var u = require('underscore');
    var $ = require('jquery');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherActivityEditDescriptionView() {
        FormView.apply(this, arguments);
    }

    VoucherActivityEditDescriptionView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    VoucherActivityEditDescriptionView.prototype.template = 'TPL_voucher_activity_edit_description';

    /**
     * @inheritDoc
     */
    VoucherActivityEditDescriptionView.prototype.uiProperties = {
        addVoucherImgBtn: {
            uploaderOptions: constants.BASE_UPLOAD_CONFIG
        }
    };

    VoucherActivityEditDescriptionView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                voucher_imgs: this.model.get('voucherActivityInfo').images
            },
            methods: {
                removeVoucherImg: function (idx) {
                    this.voucher_imgs.splice(idx, 1);
                },
                addVoucherImg: function () {
                    this.voucher_imgs.push({
                        image_url: '',
                        slogan: '',
                        description: ''
                    });
                    this.$nextTick(this.scrollTop);
                },
                scrollTop: function () {
                    var item = $('.items > div', this.$view.main).last();
                    var offset = item.offset();
                    var main = $('#main', this.$view.main);
                    var top = offset.top - main.offset().top;
                    main.scrollTop(main.scrollTop() + top);
                    item.find('input:first').focus();
                }
            }
        };
    };

    /**
     * 设置表单额外数据
     * 这个接口提供给不是input的控件去扩展，自个玩去
     *
     * @param {Object} formData key:value形式的数据 key和input的name一一对应
     */
    VoucherActivityEditDescriptionView.prototype.getExtraFormData = function () {
        return {
            images: JSON.stringify(this.vue.voucher_imgs)
        }
    };
    /**
     * @inheritDoc
     */
    VoucherActivityEditDescriptionView.prototype.uiEvents = {

    };

    require('er/util').inherits(VoucherActivityEditDescriptionView, FormView);
    return VoucherActivityEditDescriptionView;
});
