/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./index.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationStaffIndexView() {
        BaseView.apply(this, arguments);
    }

    OrganizationStaffIndexView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OrganizationStaffIndexView.prototype.template = 'TPL_organization_staff_index';

    var selectedGroupId = 0;

    var tableFields = [
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
            title: '所属员工组',
            align: 'center',
            content: function (item) {
                return item.group ? item.group.name : '';
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrganizationStaffIndexView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            /*  select: 'multi',*/
            columnResizable: true,
            noDataHtml: '该组下没有任何人员信息'
        }
    };

    OrganizationStaffIndexView.prototype.getVueOptions = function () {
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
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    OrganizationStaffIndexView.prototype.uiEvents = {

        'pager:pagechange': function (e) {
            this.forwardToPage(e);
        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        }
    };
    OrganizationStaffIndexView.prototype.forwardToPage = function (e) {
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
    OrganizationStaffIndexView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };

    /**
     * 根据Model数据重新渲染列表
     */
    OrganizationStaffIndexView.prototype.refreshList = function (page) {
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


    require('er/util').inherits(OrganizationStaffIndexView, BaseView);
    return OrganizationStaffIndexView;
});
