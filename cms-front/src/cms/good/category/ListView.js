/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var u = require('underscore');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodCategoryListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodCategoryListView.prototype.template = 'TPL_good_category_list';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            align: 'center',
            stable: true,
            sortable: true,
            width: 80,
            content: function (item) {
                return item.id;
            }
        },
        {
            field: 'name',
            title: '名称',
            sortable: true,
            content: 'name'
        },
        {
            field: 'category_name',
            title: '父级名称',
            sortable: true,
            content: function (item) {
                return item.category ? item.category.name : ' - ';
            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            sortable: true,
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 250,
            content: function (item) {
                var str =  '<a href="javascript:void(0);" data-command="addCategory" data-command-args="' + item.id + '">添加子分类</a>';
                str += ' <a href="javascript:void(0);" data-command="updateCategory" data-command-args="' + item.id + '">修改</a>';
                str += ' <a href="javascript:void(0);" data-command="deleteCategory" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodCategoryListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            editable: 1,
            //select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何分类</p>'
        }

    };

    GoodCategoryListView.prototype.getExtraSearchArgs = function () {
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
    GoodCategoryListView.prototype.uiEvents = {
        'deleteBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteCategory', {
                ids: u.pluck(items,'id')
            });
        },
        'addBtn:click': function () {
            this.fire('addCategory', {
                ids: 0
            });
        },
        'table:command': function (e) {
            if (e.name === 'deleteCategory') {
                this.fire('deleteCategory', {
                    ids: [e.args]
                });
            }
            else {
                this.fire(e.name, {
                    id: e.args
                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(GoodCategoryListView, ListView);
    return GoodCategoryListView;
});
