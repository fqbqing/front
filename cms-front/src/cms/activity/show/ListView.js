/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var u = require('underscore');
    var moment = require('moment');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ActivityShowListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ActivityShowListView.prototype.template = 'TPL_activity_show_list';

    var tableFields = [
        {
            field: 'id',
            title: '活动ID',
            align: 'center',
            sortable: true,
            stable: true,
            width: 80,
            content: 'id'
        },
        {
            field: 'name',
            title: '活动名称',
            content: function (item) {
                return item.activity ? item.activity.name : '';
            }
        },
        {
            field: 'type',
            title: '展示类型',
            width: 180,
            stable: true,
            sortable: true,
            align: 'center',
            content: function (item) {
                return utils.getActivityType(item.type);
            }
        },
        {
            field: 'order',
            title: '展示权重',
            sortable: true,
            align: 'center',
            stable: true,
            width: 100,
            content: 'order'
        },
        {
            field: 'created_time',
            title: '创建时间',
            sortable: true,
            align: 'center',
            stable: true,
            width: 160,
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            stable: true,
            width: 160,
            content: function (item) {
                var str = '<a href="#/activity/show/edit~id=' + item.id + '">修改</a>';
                str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    ActivityShowListView.prototype.uiProperties = {

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
    ActivityShowListView.prototype.uiEvents = {
        'addActivityShowBtn:click': function () {
            this.fire('addActivityShow');
        },
        'deleteActivityShowBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteActivityShow', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteActivityShow', {
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

    require('er/util').inherits(ActivityShowListView, ListView);
    return ActivityShowListView;
});
