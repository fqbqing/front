/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var u = require('underscore');
    var user = require('bat-ria/system/user');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AccessUserListView() {
        ListView.apply(this, arguments);
    }

    AccessUserListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AccessUserListView.prototype.template = 'TPL_access_user_list';

    var tableFields = [
         {
             field: 'id',
             title: '用户ID',
             content: 'id'
        },{
             field: 'username',
             title: '用户名',
             content: 'username'
         },{
             field: 'name',
             title: '姓名',
             content: 'name'
         },{
            field: 'title',
            title: '职位',
            content: 'title'
        },{
            field: 'phone',
            title: '手机号',
            content: 'phone1'
        },{
            field: 'group_name',
            title: '用户组',
            content: function(item){
                return item.group ? item.group.name : '';
            }
        },{
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 150,
            content: function (item) {
                var str = '';
                if (user.isAllow('user-company.update')) {
                    str += ' <a href="#/access/user/edit~id=' + item.id + '">修改</a>';
                }
                if (user.isAllow('role.list') && user.isAllow('user-company.update-roles')) {
                    str += '<a href="#/access/user/role~id=' + item.id + '">角色分配</a>';
                }
                if (user.isAllow('user-company.delete')) {
                    str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
        }
    ];
    /**
     * @inheritDoc
     */
    AccessUserListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有用户<br>'+(user.isAllow('user-company.add') ? '<a href="#/access/user/add">立即添加</a>' : '')+'</p>'
        }

    };


    AccessUserListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var username = this.get('searchbox').getValue();
        if (username) {
            args.username = username;
        }
        return args;
    };
    /**
     * @inheritDoc
     */
    AccessUserListView.prototype.uiEvents = {
        'addUserBtn:click':function () {
            this.fire('addUser');
        },
        'deleteUserBtn:click':function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteUser', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteUser', {
                    ids: [e.args]
                });
            }
            else {
                this.fire(e.name, {
                    name: e.args
                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }

    };

    require('er/util').inherits(AccessUserListView, ListView);
    return AccessUserListView;
});
