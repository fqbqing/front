/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrderVoucherListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderVoucherListView.prototype.template = 'TPL_order_voucher_list';


    var tableFields = [
        {
            field: 'customer_name',
            title: '姓名',
            content: function (item) {
                return item.customer ? item.customer.name : '无';
            }
        },
        {
            field: 'customer_phone',
            title: '手机号',
            align: 'center',
            content: function (item) {
                return item.customer ? item.customer.phone : '无';
            }
        },
        {
            field: 'signup_channel_name',
            title: '报名渠道',
            align: 'center',
            content: function(item){
                return item.signupChannel ? item.signupChannel.name : '';
            }
        },
        {
            field: 'order_id',
            title: '优惠券单号',
            stable: true,
            width: '120',
            align: 'center',
            content: 'order_id'
        },
        {
            field: 'voucher_name',
            title: '优惠券名称',
            align: 'center',
            content:  function (item) {
                return item.voucher ? item.voucher.name : '无';
            }
        },
        {
            field: 'created_time',
            title: '领取时间',
            align: 'center',
            stable: true,
            width: 160,
            content:  function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'amount',
            title: '优惠券价格(元)',
            align: 'center',
            content: function (item) {
                return item.amount > 0 ? utils.getAmount(item.amount) : '免费';
            }
        },
        {
            field: 'status',
            title: '优惠券状态',
            align: 'center',
            content: function (item) {
                return utils.getVoucherOrderStatus(item.status);
            }
        },
        {
            field: 'used_channel_name',
            title: '核销人',
            align: 'center',
            content: function (item) {
                return item.usedChannel ? item.usedChannel.name : '无';
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrderVoucherListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };


    OrderVoucherListView.prototype.getExtraSearchArgs = function () {
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
    OrderVoucherListView.prototype.uiEvents = {

        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'voucherOrderStatus:change': function (e) {
            this.submitSearch(e);
        },
        'voucherSelect:change': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(OrderVoucherListView, ListView);
    return OrderVoucherListView;
});
