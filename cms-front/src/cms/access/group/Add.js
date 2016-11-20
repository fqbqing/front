/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AccessGroupAdd() {
        FormAction.apply(this, arguments);
    }

    AccessGroupAdd.prototype.modelType = require('./AddModel');
    AccessGroupAdd.prototype.viewType = require('./AddView');

    AccessGroupAdd.prototype.handleSubmitResult = function (result) {
        var toast = this.getToastMessage(result);
        if (toast) {
            this.view.showToast(toast);
        }
        this.fire('aftersubmit', {
            result: result
        });
    };

    function addUser(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '添加用户',
            width: 800,
            needFoot: true,
            url: '/access/user/chooser',
            actionOptions: {
               /* selectedUsers: me.view.vue.users*/
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length > 0){
                    console.log('items the length > 0 ');
                /*    me.model.set("activity_id",items[0].id);
                    me.view.get('activity_name').setText(items[0].name);*/
                    me.view.vue.users.length = 0;
                    for(var i = 0;i < items.length; i++){
                        me.view.vue.users.push({
                            id: items[i].id,
                            name: items[i].name
                        });
                    }
                    dialog.dispose();
                }else{
                    me.view.alert("请选择一个用户!");
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });

        });
    }

    function addPrivilege() {
        var me = this;
        me.view.waitActionDialog({
            title: '添加权限',
            width: 800,
            needFoot: true,
            url: '/access/privilege/chooser',
            actionOptions: {
                /*selectedTags: me.view.vue.tags*/
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            //dialog.getFoot().getChild('btnOk').on('click', function () {
            //    var action = dialog.getAction();
            //    //var node = action.view.getSelectedNode();
            //    dialog.dispose();
            //});
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    /**
     * @protected
     * @override
     */
    AccessGroupAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addUser', addUser, this);
        this.view.on('addPrivilege', addPrivilege, this);
    };

    require('er/util').inherits(AccessGroupAdd, FormAction);
    return AccessGroupAdd;
});
