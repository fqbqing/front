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
    var SPEC_TYPE = require('./config').SPEC_TYPE;

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodSpecificationListView() {
        ListView.apply(this, arguments);
    }

    GoodSpecificationListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GoodSpecificationListView.prototype.template = 'TPL_good_specification_list';

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
            editable: 1,
            sortable: true,
            content: 'name'
        },
        {
            field: 'display_type',
            title: '展示类型',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                return SPEC_TYPE[item.display_type] || item.display_type;
            }
        },
        {
            field: 'updated_time',
            title: '更新时间',
            sortable: true,
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.updated_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 200,
            content: function (item) {
                //var str = '<a href="javascript:void(0);" data-command="editValue" data-command-args="' + item.id + '">规格取值</a>';
                var str = '<a href="#/good/specification/values~id=' + item.id + '">规格取值</a>';
                str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodSpecificationListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            editable: 1,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何规格</p>'
        },
        spectype: {
            datasource: u.map(SPEC_TYPE, function (value, key) {
                return {
                    name: value + '类型',
                    value: key
                };
            })
        }

    };


    /**
     * Vue相关配置
     * @return {Object}
     */
    GoodSpecificationListView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                state: {
                    add: false
                },
                specname: '',
                spectype: '1'
            },
            methods: {
                addSpecification: function () {
                    me.fire('addSpecification', {
                        name: this.specname,
                        spectype: this.spectype
                    });
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    GoodSpecificationListView.prototype.uiEvents = {
        'table:saveedit': function (e) {
            var row = e.target.datasource[e.rowIndex];
            if (e.field.field === 'name') {
                this.fire('updateSpecification', {
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
        'deleteBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteSpecification', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteSpecification', {
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

    require('er/util').inherits(GoodSpecificationListView, ListView);
    return GoodSpecificationListView;
});
