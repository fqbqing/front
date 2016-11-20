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
    function AccessUserChooserView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AccessUserChooserView.prototype.template = 'TPL_access_user_chooser';

    var tableFields = [
        {
            field: 'name',
            title: '姓名',
            content: 'name'
        },{
            field: 'phone1',
            title: '手机号',
            content: 'phone1'
        },{
            field: 'group_name',
            title: '用户组',
            content: function(item){
                return item.group.name;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    AccessUserChooserView.prototype.uiProperties = {

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
    AccessUserChooserView.prototype.uiEvents = {};

    require('er/util').inherits(AccessUserChooserView, ListView);
    return AccessUserChooserView;
});
