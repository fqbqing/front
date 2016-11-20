/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    var user = require('bat-ria/system/user');
    var visitor = user.visitor;
    var u = require('underscore');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function UserCustomerList() {
        ListAction.apply(this, arguments);
    }

    UserCustomerList.prototype.modelType = require('./ListModel');
    UserCustomerList.prototype.viewType = require('./ListView');

    /**
     * 释放客户
     * @param {Object} e
     */
    function releaseCustomer(e) {
        var me = this;
        var ids = e.ids;
        if (ids.length === 0) {
            return;
        }
        me.view.waitConfirm('确定要释放选中的客户吗？').then(function () {
            me.model.releaseCustomer({
                id: ids.join(',')
            }).then(function () {
                me.view.showToast('释放成功');
                me.reload();
            });
        });
    }

    /**
     * 分配客户
     * @param {Object} e
     */
    function distributeCustomer(e) {
        var me = this;
        var ids = e.ids;
        if (ids.length === 0) {
            return;
        }
        me.view.waitActionDialog({
            title: '分配销售顾问',
            width: 600,
            needFoot: true,
            url: '/access/user/chooser~group_id=' + visitor.organization.sale_group_id
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length){
                    me.distributeCustomer({
                        id: e.ids.join(','),
                        user_company_id: u.pluck(items,'id')[0] //选中的销售顾问ID
                    });
                }
                else{
                    me.view.alert('您还未选择销售顾问！');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    UserCustomerList.prototype.distributeCustomer = function (e) {
        var me = this;
        me.model.distributeCustomer(e).then(function () {
            me.reload();
        });
    };

    /**
     * @protected
     * @override
     */
    UserCustomerList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('distributeCustomer', distributeCustomer, this);
        this.view.on('releaseCustomer', releaseCustomer, this);
    };

    require('er/util').inherits(UserCustomerList, ListAction);
    return UserCustomerList;
});
