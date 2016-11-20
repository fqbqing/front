/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    var user = require('bat-ria/system/user');
    var level = require('common/level');
    var u = require('underscore');
    var constants = require('common/constants');
    var config = require('./config');


    require('esui/Tip');


    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherOrderListView() {
        ListView.apply(this, arguments);
    }
    VoucherOrderListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    VoucherOrderListView.prototype.template = 'TPL_voucher_order_list';

    var tableFields = [
         {
             field: 'name',
             title: '姓名',
             subEntry: true,
             content: function (item) {
                 if (item.customer) {
                     return '<a href="#/customer/info~id=' + item.customer.id + '">' + (item.customer.name || '-') + '</a>';
                 }
                 else if(item.agent) {
                     return '<a href="#/agent/detail~id=' + item.agent.id + '">' + (item.agent.name || '-') + '</a>';
                 }
                 return '-';
             }
         },
         {
             field: 'phone',
             title: '手机号',
             stable: true,
             width: '100',
             align: 'center',
             content: function (item) {
                 return item.customer ? item.customer.phone : (item.agent ? item.agent.phone : '-');
             }
         },
        /**
        {
            field: 'order_id',
            title: '优惠券单号',
            stable: true,
            width: '120',
            align: 'center',
            content: 'order_id'
        },
         */
        {
            field: 'voucher_name',
            title: '领取优惠券',
            align: 'center',
            content:  function (item) {
                if (item.voucher) {
                    if(item.customer){
                        return '<a href="#/voucher/order/list~category=common&voucher_id=' + item.voucher.id + '">' + item.voucher.name + '</a>'
                    }
                    else {
                        return '<a href="#/voucher/order/list~category=agent&voucher_id=' + item.voucher.id + '">' + item.voucher.name + '</a>'
                    }
                }
                return '-';
            }
        },
        {
            field: 'status',
            title: '订单状态',
            stable: true,
            width: '100',
            align: 'center',
            content: function (item) {
                var str = utils.getVoucherOrderStatus(item.status);
                if (item.status == constants.ORDER_STATUS_REFUND_FAILED) {
                    str += ' <div data-ui-type="Tip" title="'+ item.failed_message +'"></div>';
                }
                return str;
            }
        },
        {
            field: 'amount',
            title: '优惠券价格(元)',
            stable: true,
            width: '110',
            align: 'center',
            content: function (item) {
               return item.amount > 0 ? utils.getAmount(item.amount) : '免费';
            }
        },
        {
            field: 'signup_channel_name',
            title: '报名渠道',
            stable: true,
            width: '110',
            align: 'center',
            content: function(item){
                return item.signupChannel ? item.signupChannel.name : '-';
            }
        },
        {
            field: 'used_channel_name',
            title: '核销人',
            stable: true,
            width: '110',
            align: 'center',
            content: function (item) {
                return item.usedChannel ? item.usedChannel.name : '-';
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
            field: 'action',
            title: '操作',
            align: 'center',
            content: function (item) {
                var str = '';
                if (item.customer) {
                    str += '<a href="#/voucher/order/detail~id=' + item.id + '">查看</a>';
                    if(item.receiver == config.RECEIVER_SELF && ((item.status == constants.ORDER_STATUS_SUCCESS && item.amount > 0) || item.status == constants.ORDER_STATUS_APPLY_REFUND || item.status == constants.ORDER_STATUS_REFUND_FAILED)) {
                        if (user.isAllow('voucher-order.refund-online') && level.isAllow('voucher-order.refund-online')) {
                            str += '<a href="javascript:void(0)" data-command="refundOnline" data-command-args="' + item.order_id + '">线上退款</a>';
                        }
                        if (user.isAllow('voucher-order.refund-offline') && level.isAllow('voucher-order.refund-offline')) {
                            str += '<a href="javascript:void(0)" data-command="refundOffline" data-command-args="' + item.customer.name + ','+ item.customer.phone +','+ utils.getVoucherPayments(item.payment) +','+ utils.getAmount(item.amount) +','+ item.order_id +'">线下退款</a>';
                        }
                    }
                }

                if(item.status == constants.ORDER_STATUS_SUCCESS){
                    if (user.isAllow('voucher-order.check-sale') && level.isAllow('voucher-order.check-sale')) {
                        str += '<a href="javascript:void(0)" data-command="checkSale" data-command-args="' + item.cn + '">核销</a>';
                    }
                }

                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    VoucherOrderListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            select: 'multi',
            sortable: true,
            subrow: true,
            columnResizable: true
        },
        category: {
            selectedIndex: 0,
            datasource: [
                {
                    name: '普通优惠券',
                    value: 'common'
                },
                {
                    name: '经纪人优惠券',
                    value: 'agent'
                }
            ]
        }

    };
    VoucherOrderListView.prototype.getVueOptions = function () {
        return {
        };
    };

    VoucherOrderListView.prototype.getExtraSearchArgs = function () {
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
    VoucherOrderListView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'checkSale') {
                this.fire('checkOrder', {
                   cn: e.args
                });
            }
            else if (e.name === 'refundOnline') {
                this.fire('refundOnline', {
                    order_ids: [e.args]
                });
            }
            else if (e.name === 'refundOffline') {
                var param = e.args.split(',');
                this.fire('refundOffline', {
                    name: param[0],
                    phone: param[1],
                    payment: param[2],
                    amount: param[3],
                    order_id: param[4]
                });
            }
         },
        'batchRefundBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('refundOnline', {
                order_ids: u.pluck(items,'order_id')
            });
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'voucherOrderStatus:change': function (e) {
            this.submitSearch(e);
        },
        'claimed:change': function (e) {
            this.submitSearch(e);
        },
        'category:change': function (e) {
            this.submitSearch(e);
        },
        'table:subrowopen': function (e) {
            var item = e.item;
            var htm = [];
            htm.push('<div class="row">');
            htm.push('<div class="col-xs-6">');
            htm.push('<p class="table-sub-info"><b>订单号：</b><span>' + item.order_id + '</span></p>');
            htm.push('</div>');
            if (item.thirdPay) {
                var payment = utils.getPaymentText(item.payment);
                htm.push('<div class="col-xs-6">');
                htm.push('<p class="table-sub-info"><b>支付单号（' + payment + '）：</b><span>' + item.thirdPay + '</span></p>');
                htm.push('</div>');
            }
            htm.push('</div>');
            e.target.setSubrowContent(htm.join(''), e.index);
        },
        'table:subrowclose': function (e) {
            e.target.getSubrowContainer(e.index).setContent('');
        }
    };

    require('er/util').inherits(VoucherOrderListView, ListView);
    return VoucherOrderListView;
});
