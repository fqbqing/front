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
    function VoucherActivityList() {
        ListAction.apply(this, arguments);
    }

    VoucherActivityList.prototype.modelType = require('./ListModel');
    VoucherActivityList.prototype.viewType = require('./ListView');

    function addVoucherActivity() {
        this.redirect('/voucher/activity/add');
    }
    function deleteVoucherActivity(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm({
                title: '删除优惠券活动',
                content: '确定要删除选中的优惠券活动吗？',
                width: 400
            }).then(function () {
                me.model.deleteVoucherActivity(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的优惠券活动');
        }
    }
    function commitVoucherActivity(e) {
        var me = this;
        me.model.commitVoucherActivity({
            id: e.id,
            status: e.status
        }).then(function(){
            me.reload();
        },function () {
            e.btn.disable();
            e.btn.setProperties({
                checked: !e.btn.checked
            });
            e.btn.enable();
        });
    }
    /**
     * @protected
     * @override
     */
    VoucherActivityList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addVoucherActivity', addVoucherActivity, this);
        this.view.on('deleteVoucherActivity', deleteVoucherActivity, this);
        this.view.on('commitVoucherActivity', commitVoucherActivity, this);
    };

    require('er/util').inherits(VoucherActivityList, ListAction);
    return VoucherActivityList;
});
