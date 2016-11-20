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
    function GoodProductListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodProductListView.prototype.template = 'TPL_good_product_list';

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
            title: '商品名称',
            content: function (item) {
                return item.good ? item.good.name : '<span style="color:#e33;">商品不存在</span>';
            }
        },
        {
            field: 'price',
            title: '价格',
            stable: true,
            sortable: true,
            editable: 1,
            width: 150,
            content: function (item) {
                return utils.getAmount(item.price);
            }
        },
        {
            field: 'stock',
            title: '库存',
            sortable: true,
            stable: true,
            editable: 1,
            width: 130,
            content: function (item) {
                return item.stock;
            }
        },
        {
            field: 'spec',
            title: '规格',
            stable: true,
            width: 300,
            content: function (item) {
                var htm = [];
                u.each(item.specifications, function (spec) {
                    htm.push('<label class="speci" title="' + spec.name + '">'
                        + spec.specificationValue.name + '</label>');
                });
                return htm.join('');
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                var str = '<a href="javascript:void(0);" data-command="deleteProduct" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodProductListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            editable: 1,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何货品<br><a href="#/good/product/add">立即添加</a></p>'
        }

    };

    GoodProductListView.prototype.getExtraSearchArgs = function () {
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
    GoodProductListView.prototype.uiEvents = {
        'addBtn:click': function () {
            this.fire('addProduct');
        },
        'deleteBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteProduct', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'deleteProduct') {
                this.fire('deleteProduct', {
                    ids: [e.args]
                });
            }
            else {
                this.fire(e.name, {
                    name: e.args
                });
            }
        },
        'table:saveedit': function (e) {
            var row = e.target.datasource[e.rowIndex];
            this.fire('updateProduct', {
                table: e.target,
                data: {
                    field: e.field.field,
                    value: e.value,
                    id: row.id
                },
                rowIndex: e.rowIndex,
                columnIndex: e.columnIndex
            });
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(GoodProductListView, ListView);
    return GoodProductListView;
});
