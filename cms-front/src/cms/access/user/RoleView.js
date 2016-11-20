/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./role.tpl.html');
    var utils = require('common/utils');
    var u = require('underscore');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AccessUserRoleView() {
        BaseView.apply(this, arguments);
    }

    AccessUserRoleView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AccessUserRoleView.prototype.template = 'TPL_access_user_role';

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
                var inGroup = u.find(this.roles.group, function (role) {
                    return role.id === item.id;
                });
                var inUser = u.find(this.roles.user, function (role) {
                    return role.id === item.id;
                });
                if (inGroup || inUser) {
                    return '已分配';
                }
                return '<a href="javascript:void(0);" data-command="alloc" data-command-args="' + idx + '">分配</a>';
            }
        }
    ];

    AccessUserRoleView.prototype.allocRole = function (idx) {
        var table = this.get('table');
        var role = table.datasource[idx];
        var roles = this.vue.roles.user;
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
    AccessUserRoleView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            roles: '@roles',
            noDataHtml: '<p style="margin:0;">还没有任何角色</p>',
            refresh: function () {
                this.setDatasource(this.datasource);
            }
        },
        pager: {
            pageSizes: [],
            backCount: 1,
            forwardCount: 1
        }
    };

    AccessUserRoleView.prototype.getVueOptions = function () {
        return {
            methods: {
                removeRole: function (role) {
                    this.roles.user.splice(u.findIndex(this.roles.user, {
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
    AccessUserRoleView.prototype.uiEvents = {
        'saveBtn:click': function () {
            this.fire('saveRole');
        },
        'table:command': function (e) {
            if (e.name === 'alloc') {
                this.allocRole(e.args);
            }
        },
        'pager:pagechange': function (e) {
            this.forwardToPage(e);
        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        }
    };
    AccessUserRoleView.prototype.forwardToPage = function (e) {
        var pager = this.get('pager');
        var page = e.target.get('page');
        var pageSize = e.target.get('pageSize');
        if(!pager.isDisabled()){
            this.fire('pageSizeChange', {page: page, pageSize: pageSize});
        }
    };
    /**
     * 根据Model数据重新渲染页面
     */
    AccessUserRoleView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };

    /**
     * 根据Model数据重新渲染列表
     */
    AccessUserRoleView.prototype.refreshList = function (page) {
        var model = this.model;
        var table = this.get('table');
        table.disable();
        if (table) {
            table.setProperties(
                {
                    datasource: page.data
                }
            );
        }
        table.enable();
        var pager = this.get('pager');
        pager.disable();
        if (pager) {
            pager.setProperties(
                {
                    count: page.totalCount,
                    page: page.pageNo,
                    pageSize: page.pageSize
                },
                {silent: true}
            );
        }
        pager.enable();
    };

    require('er/util').inherits(AccessUserRoleView, BaseView);
    return AccessUserRoleView;
});
