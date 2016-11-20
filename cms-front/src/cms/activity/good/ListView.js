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
    function ActivityGoodListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ActivityGoodListView.prototype.template = 'TPL_activity_good_list';

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
            field: 'action',
            title: '关联方式',
            align: 'center',
            stable: true,
            width: 160,
            content: function (item) {
                if (item.action == 1) {
                    return '包含';
                }
                else if (item.action == 2) {
                    return '排除';
                }
                return '未知';
            }
        },
        {
            field: 'type',
            title: '关联类型',
            align: 'center',
            stable: true,
            width: 160,
            content: function (item) {
                if (item.type == 2) {
                    return '商品';
                }
                else if (item.type == 1) {
                    return '分类';
                }
                return '未知';
            }
        },
        {
            field: 'name',
            title: '名称',
            content: function (item) {
                if (item.good) {
                    return item.good.name;
                }
                else if (item.category) {
                    return item.category.name;
                }
                return '-';
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 150,
            content: function (item) {
                var str = '<a href="javascript:void(0);" data-command="deleteActivityGood" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    ActivityGoodListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何商品</p>'
        }

    };

    /**
     * @inheritDoc
     */
    ActivityGoodListView.prototype.uiEvents = {
        'addGoodBtn:click': function () {
            this.fire('addGood');
        },
        'addCategoryBtn:click': function () {
            this.fire('addCategory');
        },
        'deleteBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteActivityGood', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'deleteActivityGood') {
                this.fire('deleteActivityGood', {
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

    require('er/util').inherits(ActivityGoodListView, ListView);
    return ActivityGoodListView;
});
