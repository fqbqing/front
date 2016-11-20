/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function VoucherList() {
        ListAction.apply(this, arguments);
    }

    VoucherList.prototype.modelType = require('./ListModel');
    VoucherList.prototype.viewType = require('./ListView');

    function addVoucher() {
        this.redirect('/voucher/add');
    }
    function deleteVoucher(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm({
                title: '删除优惠券',
                content: '确定要删除选中的优惠券吗？',
                width: 350
            }).then(function () {
                me.model.deleteVoucher(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的优惠券');
        }
    }
    /**
     * @protected
     * @override
     */
    VoucherList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addVoucher',addVoucher,this);
        this.view.on('deleteVoucher', deleteVoucher, this);


    };

    require('er/util').inherits(VoucherList, ListAction);
    return VoucherList;
});
