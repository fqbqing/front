/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./chooser.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var u = require('underscore');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ActivityChooserView() {
        ListView.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    ActivityChooserView.prototype.template = 'TPL_activity_chooser';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return item.id;
            }
        },
        {
            field: 'name',
            title: '活动名称',
            stable: true,
            width: 160,
            content: 'name'
        },
        {
            field: 'brief',
            title: '活动简介',
            content: 'brief'
        },
        {
            field: 'count',
            title: '关联商品数',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return item.good ? item.good.length : 0;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    ActivityChooserView.prototype.uiProperties = {

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
    ActivityChooserView.prototype.uiEvents = {};

    require('er/util').inherits(ActivityChooserView, ListView);
    return ActivityChooserView;
});
