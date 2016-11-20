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
    function AccessUserList() {
        ListAction.apply(this, arguments);
    }

    AccessUserList.prototype.modelType = require('./ListModel');
    AccessUserList.prototype.viewType = require('./ListView');
    function addUser() {
        this.redirect('/access/user/add');
    }

    function deleteUser(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的用户吗？').then(function () {
                me.model.deleteUser(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的用户');
        }
    }

    /**
     * 搜索商品
     * @param e
     */
    function searchUser(e) {
        if(e.username.trim().length > 0){
            this.redirectForSearch({
                username: e.username
            });
        }else{
            this.view.alert("请填写手机号！");
        }
    }
    /**
     * @protected
     * @override
     */
    AccessUserList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here

        this.view.on('addUser', addUser, this);
        this.view.on('deleteUser', deleteUser, this);
        this.view.on('searchUser', searchUser, this);
    };

    require('er/util').inherits(AccessUserList, ListAction);
    return AccessUserList;
});
