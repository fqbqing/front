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
    function StaffListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    StaffListView.prototype.template = 'TPL_staff_list';

    var tableFields = [
        // {
        //     field: 'id',
        //     title: 'ID',
        //     content: function (item) {
        //         return '#' + item.id;
        //     }
        // },
        // {
        //     field: 'name',
        //     title: 'Name',
        //     content: 'name'
        // },
        // {
        //     field: 'email',
        //     title: 'Email',
        //     content: function (item) {
        //         var email = item.email;
        //         return '<a href="mailto:' + email + '">' + email + '</a>';
        //     }
        // }
    ];

    /**
     * @inheritDoc
     */
    StaffListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };

    /**
     * @inheritDoc
     */
    StaffListView.prototype.uiEvents = {};

    require('er/util').inherits(StaffListView, ListView);
    return StaffListView;
});
