/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var u = require('underscore');
    var Deferred = require('er/Deferred');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function VoucherActivityEditConfigure() {
        FormAction.apply(this, arguments);
    }

    VoucherActivityEditConfigure.prototype.modelType = require('./ConfigureModel');
    VoucherActivityEditConfigure.prototype.viewType = require('./ConfigureView');
    VoucherActivityEditConfigure.prototype.redirectAfterSubmit = function (result) {
        var url = '/voucher/activity/list';
        this.redirect(url);
    };
    function chooseVoucher (){
        var me = this;
        me.view.waitActionDialog({
            title: '配置优惠券',
            width: 800,
            needFoot: true,
            url: '/voucher/chooser'
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length) {
                    u.each(items,function(item) {
                        me.view.vue.vouchers.push(item);
                    });
                    dialog.dispose();
                }
                else {
                    me.view.alert('您还未选择优惠券！');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

        /**
     * @protected
     * @override
     */
    VoucherActivityEditConfigure.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('chooseVoucher', chooseVoucher, this);
    };

    require('er/util').inherits(VoucherActivityEditConfigure, FormAction);
    return VoucherActivityEditConfigure;
});
