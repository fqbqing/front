/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    var u = require('underscore');
    var config = require('./config');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrderListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderListView.prototype.template = 'TPL_order_list';

    var tableFields = [
        {
            field: 'order_id',
            title: '订单号',
            stable: true,
            width: 160,
            content: 'order_id'
        },
        {
            field: 'title',
            title: '货品',
            content: function (item) {
                var text = '<div>' + item.product.name + '</div>';
                var sValue = u.pluck(item.product.specification, 'specificationValue');
                var sValueN = u.pluck(sValue, 'name');
                text += '<div>';
                for (var i = 0; i < sValueN.length; i++) {
                    text += '<span class="speci">' + sValueN[i] + '</span>';
                }
                text += '</div>';
                text += '<div>' + utils.getAmount(item.product.amount) + '元</div>';
                return text;
            }
        },
        {
            field: 'status',
            title: '订单状态',
            stable: true,
            width: 100,
            content: function (item) {
                return utils.getOrderStatus(item.status);
            }
        },
        {
            field: 'deposit',
            title: '订单支付金额（元）',
            stable: true,
            width: 80,
            content: function (item) {
                return utils.getAmount(item.deposit);
            }
        },
        {
            field: 'payment',
            title: '支付方式',
            stable: true,
            width: 80,
            content: function (item) {
                return utils.getPaymentText(item.payment);
            }
        },
        {
            field: 'name',
            title: '姓名',
            stable: true,
            width: 100,
            content: function (item) {
                return item.user_info ? item.user_info.user_name : '';
            }
        },
        {
            field: 'phone',
            title: '手机号',
            stable: true,
            width: 100,
            content: function (item) {
                return item.user_info ? item.user_info.user_phone : '';
            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            stable: true,
            width: 150,
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            stable: true,
            width: 60,
            content: function (item) {
                var str = '<a href="#/order/detail~order_id=' + item.order_id + '">修改</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrderListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>',
        }

    };

    OrderListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var phone = this.get('searchbox').getValue();
        if (phone) {
            args.phone = phone;
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    OrderListView.prototype.uiEvents = {
        'orderStatus:change': function (e) {
            this.submitSearch(e);
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'exclude:change': function (e) {
            this.submitSearch(e);
        },
        'deleteOrderBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteOrder', {
                ids: u.pluck(items, 'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteOrder', {
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

    require('er/util').inherits(OrderListView, ListView);
    return OrderListView;
});
