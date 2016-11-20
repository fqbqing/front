/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');
    var u = require('underscore');
    var user = require('bat-ria/system/user');
    var visitor = user.visitor;
    /**
     * Action构造函数
     *
     * @constructor
     */
    function CustomerList() {
        ListAction.apply(this, arguments);
    }

    CustomerList.prototype.modelType = require('./ListModel');
    CustomerList.prototype.viewType = require('./ListView');

    function searchUser(e) {
        if(e.phone.trim().length > 0){
            this.redirectForSearch({
                phone: e.phone
            });
        }else{
            this.view.alert("请填写用户名！");
        }
    }
    function distribute(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '分配销售顾问',
            width: 800,
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
                        id: e.id,
                        cur_user_company_id: e.cur_user_company_id,
                        user_company_id: u.pluck(items,'id')[0] //选中的销售顾问ID
                    });
                }else{
                    me.view.alert('您还未选择销售顾问！');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    CustomerList.prototype.distributeCustomer = function (e) {
        var me = this;
        return this.model.distribute({
            id: e.id,
            cur_user_company_id: e.cur_user_company_id,
            user_company_id: e.user_company_id
        }).then(function (result) {
            me.reload();
        });
    };

    /**
     * @protected
     * @override
     */
    CustomerList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('searchUser', searchUser, this);
        this.view.on('distribute', distribute, this);
    };

    require('er/util').inherits(CustomerList, ListAction);
    return CustomerList;
});
