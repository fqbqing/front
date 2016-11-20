/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./process.tpl.html');
    var u = require('underscore');
    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanEditProcessView() {
        FormView.apply(this, arguments);
    }
    TuanEditProcessView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    TuanEditProcessView.prototype.template = 'TPL_tuan_edit_process';

    TuanEditProcessView.prototype.getExtraFormData = function () {
        var vue = this.vue;
        var process = [];
        u.each(vue.process, function (item) {
            process.push(item.title+':'+item.content);
        });
        var coupon_refund = [];
        u.each(vue.coupon_refund, function (item) {
            coupon_refund.push(item);
        });
        return {
            process: process.join('\n'),
            coupon_refund: coupon_refund.join('\n')
        };
    };

    /**
     * @inheritDoc
     */
    TuanEditProcessView.prototype.uiProperties = {

    };
    TuanEditProcessView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                process: me.model.get('formData').process || [{
                    title: '',
                    content: ''
                }],
                coupon_refund: me.model.get('formData').coupon_refund || ['']
            },
            methods: {
                removeProcess: function (idx) {
                    this.process.splice(idx, 1);
                },
                removeRefund: function (idx) {
                    this.coupon_refund.splice(idx, 1);
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditProcessView.prototype.uiEvents = {
        'addProcessBtn:click':function(){
            if(this.vue.process.length < 10){
                this.vue.process.push({
                    title: '',
                    content: ''
                });
            }else{
                this.alert('参与流程不超过10项');
            }
        },
        'addRefundBtn:click':function(){
            if(this.vue.coupon_refund.length < 10){
                this.vue.coupon_refund.push("");
            }else{
                this.alert('退还政策不超过10项');
            }
        }
    };

    require('er/util').inherits(TuanEditProcessView, FormView);
    return TuanEditProcessView;
});
