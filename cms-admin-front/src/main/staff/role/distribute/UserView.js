/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./user.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var utils = require('common/utils');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function StaffRoleDistributeUserView() {
        BaseView.apply(this, arguments);
    }

    StaffRoleDistributeUserView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    StaffRoleDistributeUserView.prototype.template = 'TPL_staff_role_distribute_user';

    var tableFields = [
        {
            field: 'name',
            title: '名称',
            content: 'name'
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 80,
            content: function (item, idx) {
                var inGroup = u.find(this.roles.staffGroup, function (role) {
                    return role.id === item.id;
                });
                var inUser = u.find(this.roles.staff, function (role) {
                    return role.id === item.id;
                });
                if (inGroup || inUser) {
                    return '已分配';
                }
                return '<a href="javascript:void(0);" data-command="alloc" data-command-args="' + idx + '">分配</a>';
            }
        }
    ];

    StaffRoleDistributeUserView.prototype.allocRole = function (idx) {
        var table = this.get('table');
        var role = table.datasource[idx];
        var roles = this.vue.roles.staff;
        var tmp = u.find(roles, function (item) {
            return item.id === role.id;
        });
        if (!tmp) {
            roles.push(role);
        }
        table.refresh();
    };

    /**
     * @inheritDoc
     */
    StaffRoleDistributeUserView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            roles: '@roles',
            noDataHtml: '<p style="margin:0;">还没有任何角色</p>',
            refresh: function () {
                this.setDatasource(this.datasource);
            }
        }
    };

    StaffRoleDistributeUserView.prototype.getVueOptions = function () {
        return {
            methods: {
                removeRole: function (role) {
                    this.roles.staff.splice(u.findIndex(this.roles.staff, {
                        id: role.id
                    }), 1);
                    this.$view.get('table').refresh();
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    StaffRoleDistributeUserView.prototype.uiEvents = {
        'saveBtn:click': function () {
            this.fire('saveRole');
        },
        'table:command': function (e) {
            if (e.name === 'alloc') {
                this.allocRole(e.args);
            }
        }
    };

    require('er/util').inherits(StaffRoleDistributeUserView, BaseView);
    return StaffRoleDistributeUserView;
});
