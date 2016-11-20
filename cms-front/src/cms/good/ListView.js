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
    function GoodListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodListView.prototype.template = 'TPL_good_list';

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
            field: 'bn',
            title: '商品编号',
            sortable: true,
            align: 'center',
            stable: true,
            width: 80,
            content: 'bn'
        },
        {
            field: 'image_url',
            title: '封面图片',
            stable: true,
            width: 160,
            content: function (item) {
                return '<img src="' + item.image_url + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
            }
        },
        {
            field: 'name',
            title: '商品名称',
            sortable: true,
            content: 'name'
        },
        {
            field: 'market_price',
            title: '厂商指导价',
            stable: true,
            align: 'center',
            width: 80,
            content: function (item) {
                return utils.getAmount(item.market_price);
            }
        },
        {
            field: 'low_price',
            title: '最低售价',
            stable: true,
            align: 'center',
            width: 80,
            content: function (item) {
                return utils.getAmount(item.low_price);
            }
        },
        {
            field: 'order',
            title: '展示顺序',
            stable: true,
            align: 'center',
            width: 70,
            content: function (item) {
                return item.order;
            }
        },
        {
            field: 'marketable',
            title: '是否上架',
            stable: true,
            sortable: true,
            align: 'center',
            width: 80,
            content: function (item) {
                return item.marketable == 1 ? '是' : '否';
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            align: 'center',
            width: 150,
            content: function (item) {
                var str = '<a href="#/good/product/list~good_id=' + item.id + '">货品管理</a>';
                str += ' <a href="#/good/edit~id=' + item.id + '">修改</a>';
                str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何商品<br><a href="#/good/add">立即添加</a></p>'
        }

    };

    GoodListView.prototype.getExtraSearchArgs = function () {
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
    GoodListView.prototype.uiEvents = {
        'addGoodBtn:click': function () {
            this.fire('addGood');
        },
        'deleteGoodBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteGood', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteGood', {
                    ids: [e.args]
                });
            }
            else {
                this.fire(e.name, {
                    name: e.args
                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(GoodListView, ListView);
    return GoodListView;
});
