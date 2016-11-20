/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationStaffListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationStaffListView.prototype.template = 'TPL_organization_staff_list';

    var tableFields = [
        {
            field: 'name',
            title: '姓名',
            align: 'left',
            content: 'name'
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
        }
    ];

    /**
     * @inheritDoc
     */
    OrganizationStaffListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            select: 'single'
        }

    };
    OrganizationStaffListView.prototype.getExtraSearchArgs = function () {
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
    OrganizationStaffListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(OrganizationStaffListView, ListView);
    return OrganizationStaffListView;
});
