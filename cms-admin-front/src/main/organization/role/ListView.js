/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    var utils = require('common/utils');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationRoleListView() {
        ListView.apply(this, arguments);
    }

    OrganizationRoleListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationRoleListView.prototype.template = 'TPL_organization_role_list';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            align: 'center',
            stable: true,
            sortable: true,
            width: 80,
            content: function (item) {
                return item.id;
            }
        },
        {
            field: 'name',
            title: '名称',
            sortable: true,
            content: 'name'
        },
        {
            field: 'type',
            title: '类型',
            sortable: true,
            content: function (item) {
                var text = '未知';
                if (item.type == 1) {
                    text = '基础角色'
                }
                else if (item.type == 2) {
                    text = '高级角色'
                }
                return text;
            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            sortable: true,
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 150,
            content: function (item) {
                var str = '';
                if (user.isAllow('role.update-permissions')) {
                    str += '<a href="#/organization/role/authorization~id=' + item.id + '">权限</a>';
                }
                if (user.isAllow('role.update')) {
                    str += '<a href="javascript:void(0);" data-command="update" data-command-args="' + item.id + '">修改</a>';
                }
                if (user.isAllow('role.delete')) {
                    str += '<a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrganizationRoleListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何角色</p>'
        }
    };

    /**
     * Vue相关配置
     * @return {Object}
     */
    OrganizationRoleListView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                state: {
                    add: false
                },
                rolename: ''
            },
            methods: {
                addRole: function () {
                    me.fire('addRole', {
                        name: this.rolename
                    });
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationRoleListView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteRole', {
                    ids: [e.args]
                });
            }
            else if (e.name === 'update') {
                this.fire('updateRole', {
                    ids: [e.args]
                });
            }
            else {
                this.fire(e.name, {
                    name: e.args
                });
            }
        }
    };

    require('er/util').inherits(OrganizationRoleListView, ListView);
    return OrganizationRoleListView;
});
