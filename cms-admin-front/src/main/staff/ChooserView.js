/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./chooser.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function StaffChooserView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    StaffChooserView.prototype.template = 'TPL_staff_chooser';


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
                return item.staffGroup ? item.staffGroup.name : '';
            }
        }
    ];
    /**
     * @inheritDoc
     */
    StaffChooserView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'single',
            selectMode: 'line',
            columnResizable: true
        }

    };

    /**
     * @inheritDoc
     */
    StaffChooserView.prototype.uiEvents = {};

    require('er/util').inherits(StaffChooserView, ListView);
    return StaffChooserView;
});
