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
    function AccessGroupList() {
        ListAction.apply(this, arguments);
    }

    AccessGroupList.prototype.modelType = require('./ListModel');
    AccessGroupList.prototype.viewType = require('./ListView');

    function addGroup() {
        this.redirect('/access/group/add');
    }

    function deleteGroup(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的用户组吗？').then(function () {
                me.model.deleteGroup(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的用户组');
        }
    }

    /**
     * 搜索商品
     * @param e
     */
    function searchGroup(e) {
        if(e.name.trim().length > 0){
            this.redirectForSearch({
                name: e.name
            });
        }else{
            this.view.alert("请填写用户组名！");
        }
    }
    /**
     * @protected
     * @override
     */
    AccessGroupList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addGroup', addGroup, this);
        this.view.on('deleteGroup', deleteGroup, this);
        this.view.on('searchGroup', searchGroup, this);
    };

    require('er/util').inherits(AccessGroupList, ListAction);
    return AccessGroupList;
});
