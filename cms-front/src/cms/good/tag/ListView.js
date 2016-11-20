/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    var moment = require('moment');
    var u = require('underscore');
    var utils = require('common/utils');


    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodTagListView() {
        ListView.apply(this, arguments);
    }

    GoodTagListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GoodTagListView.prototype.template = 'TPL_good_tag_list';

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
             editable: 1,
             content: 'name'
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
            width: 150,
            content: function (item) {
                var str = '<a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodTagListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            editable: 1,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何标签</p>'
        }

    };

    /**
     * Vue相关配置
     * @return {Object}
     */
    GoodTagListView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                state: {
                    add: false
                },
                tagname: ''
            },
            methods: {
                addTag: function () {
                    me.fire('addTag', {
                        name: this.tagname
                    });
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    GoodTagListView.prototype.uiEvents = {
        'table:saveedit': function (e) {
            var row = e.target.datasource[e.rowIndex];
            if (e.field.field === 'name') {
                this.fire('updateTag', {
                    table: e.target,
                    tag: {
                        name: e.value,
                        id: row.id
                    },
                    rowIndex: e.rowIndex,
                    columnIndex: e.columnIndex
                });
            }
        },
        'deleteTagBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteTag', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteTag', {
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

    require('er/util').inherits(GoodTagListView, ListView);
    return GoodTagListView;
});
