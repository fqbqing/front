/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ActivityListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ActivityListView.prototype.template = 'TPL_activity_list';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            align: 'center',
            sortable: true,
            stable: true,
            width: 80,
            content: function (item) {
                return item.id;
            }
        },
        {
            field: 'name',
            title: '活动名称',
            sortable: true,
            stable: true,
            width: 300,
            content: 'name'
        },
        {
            field: 'brief',
            title: '活动简介',
            content: 'brief'
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            stable: true,
            width: 160,
            content: function (item) {
                var str = '<a href="#/activity/good/list~activity_id=' + item.id + '">商品管理</a>';
                str += ' <a href="#/activity/edit~id=' + item.id + '">修改</a>';
                str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';

                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    ActivityListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有活动</p>'
        }

    };

    /**
     * @inheritDoc
     */
    ActivityListView.prototype.uiEvents = {
        'addActivityBtn:click': function () {
            this.fire('addActivity');
        },
        'deleteActivityBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteActivity', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteActivity', {
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

    require('er/util').inherits(ActivityListView, ListView);
    return ActivityListView;
});
