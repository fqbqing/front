/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');
    var utils = require('common/utils');

    var ListView = require('bat-ria/mvc/ListView');
    var user = require('bat-ria/system/user');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AccessRoleListView() {
        ListView.apply(this, arguments);
    }

    AccessRoleListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AccessRoleListView.prototype.template = 'TPL_access_role_list';

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
    AccessRoleListView.prototype.uiProperties = {

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
    AccessRoleListView.prototype.getVueOptions = function () {
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
    AccessRoleListView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteRole', {
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

    require('er/util').inherits(AccessRoleListView, ListView);
    return AccessRoleListView;
});
