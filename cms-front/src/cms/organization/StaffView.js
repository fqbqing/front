/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./staff.tpl.html');
    var BaseView = require('bat-ria/mvc/BaseView');
    var user = require('bat-ria/system/user');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationStaffView() {
        BaseView.apply(this, arguments);
    }
    OrganizationStaffView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OrganizationStaffView.prototype.template = 'TPL_organization_staff';

    var selectedGroupId = 0;

    var tableFields = [
        //{
        //    field: 'username',
        //    title: '用户名',
        //    align: 'center',
        //    content: 'username'
        //},
        {
            field: 'name',
            title: '姓名',
            align: 'left',
            content: function (item) {
                return item.in_charge == 1 && selectedGroupId == item.group.id
                    ? '<span class="staff-name">' + item.name + '</span>'
                    : '<span>' + item.name + '</span>';
            }
        },
        {
            field: 'phone1',
            title: '手机号',
            stable: true,
            width: 120,
            content: 'phone1'
        },
        {
            field: 'title',
            title: '职位',
            align: 'center',
            stable: true,
            width: 120,
            content: 'title'
        },
        {
            field: 'group_name',
            title: '所属组',
            align: 'center',
            content: function (item) {
                return item.group ? item.group.name : '';
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            content: function (item) {
                var str = '';
                if(user.isAllow('user-company.update')){
                    str += ' <a href="javascript:void(0);" data-command="update" data-command-args="' + item.id + '">修改</a>';
                    //str += ' <a href="javascript:void(0);" data-command="move" data-command-args="' + item.id + '">迁移</a>';
                }
                if(user.isAllow('user-company.update-roles')){
                    str += '<a href="javascript:void(0);" data-command="updateUserRole" data-command-args="' + item.id + ',' + item.name + '">角色分配</a>';
                }
                if(user.isAllow('user-company.delete')){
                    str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrganizationStaffView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
          /*  select: 'multi',*/
            columnResizable: true,
            noDataHtml: '该组下没有任何人员信息'
        }
    };

    OrganizationStaffView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                selectedGroupItem: null,
                selectedGroup: me.model.get('treeData'),
                treeState: {
                    selectedId: me.model.get('treeData').id,
                    topGroup: me.model.get('treeData')
                }
            },
            ready: function () {

            },
            methods: {
            },
            events: {
                'get-group-staff': function (item) {
                    // 事件回调内的 `this` 自动绑定到注册它的实例上
                    this.selectedGroup = item.model;
                    this.selectedGroupItem = item;
                    selectedGroupId = item.model.id;
                    me.fire('getGroupStaff',{
                        group_id: item.model.id
                    });
                },
                'deleteGroup': function (item) {
                    this.selectedGroup = item.$parent.model;
                    this.selectedGroupItem = item.$parent;
                    me.fire('deleteGroup',item)
                },
                'updateGroup': function (item) {
                    this.selectedGroup = item.model;
                    this.selectedGroupItem = item;
                    me.fire('updateGroup',item)
                },
                'updateGroupRole': function (item) {
                    me.fire('updateGroupRole',item)
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    OrganizationStaffView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteGroupStaff', {
                    ids: [e.args]
                });
            }
            else if(e.name === 'update'){
                this.fire('updateGroupStaff', {
                    id: e.args
                });
            }
            else if(e.name === 'move'){
                this.fire('moveGroupStaff', {
                    id: e.args
                });
            }
            else if(e.name === 'updateUserRole'){
                var data = e.args.split(',');
                this.fire('updateUserRole', {
                    id: data[0],
                    name: data[1]
                });
            }
        },
        'pager:pagechange': function (e) {
            this.forwardToPage(e);
        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        },
        'addGroup:click': function () {
            this.fire('addGroup');
        },
        'addGroupStaff:click': function () {
            this.fire('addGroupStaff');
        }
    };
    OrganizationStaffView.prototype.forwardToPage = function (e) {
        var pager = this.get('pager');
        var page = e.target.get('page');
        var pageSize = e.target.get('pageSize');
        if(!pager.isDisabled()){
            this.fire('pageSizeChange', { group_id: this.vue.selectedGroup.id, page: page, pageSize: pageSize});
        }
    };
    /**
     * 根据Model数据重新渲染页面
     */
    OrganizationStaffView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };

    /**
     * 根据Model数据重新渲染列表
     */
    OrganizationStaffView.prototype.refreshList = function (page) {
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

    OrganizationStaffView.prototype.enterDocument = function () {
        selectedGroupId = this.model.get('treeData').id;
        BaseView.prototype.enterDocument.apply(this);
    };

    require('er/util').inherits(OrganizationStaffView, BaseView);
    return OrganizationStaffView;
});
