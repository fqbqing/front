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
    function AccessGroupListView() {
        ListView.apply(this, arguments);
    }

    AccessGroupListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AccessGroupListView.prototype.template = 'TPL_access_group_list';

    var tableFields = [
        {
            field: 'id',
            title: '用户组ID',
            content: 'id'
        },{
            field: 'name',
            title: '用户组名',
            content: function (item) {
                return '<a href="#/access/user/list~group_id=' + item.id + '">' + item.name + '</a>';
            }
        },{
            field: 'organization_name',
            title: '组织',
            content: function (item) {
                return item.organization_name || '';
            }
        },{
            field: 'phone',
            title: '组织联系方式',
            content: function (item) {
                return item.organization ? item.organization.phone : '';
            }
        },{
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 150,
            content: function (item) {
                var str = '';
                if (user.isAllow('user-group.update')) {
                    str += '<a href="#/access/group/edit~id=' + item.id + '">修改</a>';
                }
                if (user.isAllow('role.list') && user.isAllow('user-group.update-roles')) {
                    str += '<a href="#/access/group/role~id=' + item.id + '">角色分配</a>';
                }
                if (user.isAllow('user-group.delete')) {
                    str += '<a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    AccessGroupListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有用户组<br>'+(user.isAllow('user-group.add') ? '<a href="#/access/group/add">立即添加</a>' : '')+'</p>'
        }
    };

    AccessGroupListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var name = this.get('searchbox').getValue();
        if (name) {
            args.name = name;
        }
        return args;
    };
    /**
     * @inheritDoc
     */
    AccessGroupListView.prototype.uiEvents = {
        'addGroupBtn:click':function () {
            this.fire('addGroup');
        },
        'deleteGroupBtn:click':function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteGroup', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteGroup', {
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

    require('er/util').inherits(AccessGroupListView, ListView);
    return AccessGroupListView;
});
