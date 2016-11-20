/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    var u = require('underscore');
    var utils = require('common/utils');
    var user = require('bat-ria/system/user');
    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GrouponSignupListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GrouponSignupListView.prototype.template = 'TPL_groupon_signup_list';

    var tableFields = [
        {
            field: 'name',
            title: '姓名',
            align: 'left',
            subEntry: true,
            content: function(item){
                var customerName = item.customer ? item.customer.name : null;
                var showName = item.username;
                if(item.customer){
                    showName = item.username == customerName ? item.username : item.username + '(' + customerName + ')';
                    return '<a href="#/customer/info~id=' + item.customer.id + '" title="查看客户详情">' + showName + '</a>';
                }
                return showName;
            }
        },
        {
            field: 'phone',
            title: '手机号',
            align: 'center',
            stable: true,
            width: 120,
            content: 'phone'
        },
        {
            field: 'status',
            title: '订单状态',
            align: 'center',
            /*  stable: true,
             width: 100,*/
            content: function(item){
                return item.order ? utils.getVoucherOrderStatus(item.order.status) : '已报名';
            }
        },
        {
            field: 'created_time',
            title: '报名时间',
            align: 'center',
            stable: true,
            sortable: true,
            width: 180,
            content: function(item){
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'signin_status',
            title: '签到',
            align: 'center',
            stable: true,
            sortable: true,
            width: 90,
            content: function (item) {
                return item.signin_status == constants.SIGN_IN_STATUS_NO ? '未签到' : '<span class="status-label-hl">已签到</span>';
            }
        },
        {
            field: 'signup_channel_name',
            title: '报名渠道',
            align: 'center',
            content: function(item){
                return item.channel ? item.channel.name : '';
            }
        },
        {
            field: 'used_channel_name',
            title: '核销人',
            align: 'center',
            content: function(item){
                if (item.order) {
                    return item.order.usedChannel ? item.order.usedChannel.name : '-';
                }
                return '-';
            }
        },
        {
            field: 'status',
            title: '成交状态',
            stable: true,
            width: '110',
            align: 'center',
            content: function (item) {
                return item.status == constants.DEAL_STATUS_YES ? '<span class="tuan-status tuan-status-online">已成交</span>' : '<span class="tuan-status tuan-status-offline">未成交</span>';
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            width: 100,
            content: function (item) {
                var str = '';
                //str += '<a href="#/order/tuan/detail~order_id=' + item.id + '">查看</a>';
                if (item.order) {
                    if (item.order.receiver == constants.RECEIVER_SELF && (item.order.status == constants.ORDER_STATUS_SUCCESS || item.order.status == constants.ORDER_STATUS_APPLY_REFUND || item.order.status == constants.ORDER_STATUS_REFUND_FAILED)) {
                        if (user.isAllow('voucher-order.refund-online')) {
                            str += '<a href="javascript:void(0)" data-command="refundOnline" data-command-args="' + item.order.order_id + '">线上退款</a>';
                        }
                        if (user.isAllow('voucher-order.refund-offline')) {
                            str += '<a href="javascript:void(0)" data-command="refundOffline" data-command-args="'+ item.order.order_id +'">线下退款</a>';
                        }
                    }
                    if (item.order.status == constants.ORDER_STATUS_SUCCESS && user.isAllow('voucher-order.check-sale')) {
                        str += '<a href="javascript:void(0)" data-command="checkSale" data-command-args="' + item.order.order_id + '">核销</a>';
                        return str;
                    }
                }
                str += item.status == constants.DEAL_STATUS_NO && user.isAllow('activity-signup.make-deal') ? '<a href="javascript:void(0)" data-command="makeDeal" data-command-args="' + item.id + '">标记成交</a>' : '-';

                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GrouponSignupListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            subrow: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有报名</p>'
        }

    };

    GrouponSignupListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var phone = this.get('searchbox').getValue();
        if (phone) {
            args.phone = phone;
        }
        if (this.model.get('activity_id')) {
            args.activity_id = this.model.get('activity_id');
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    GrouponSignupListView.prototype.uiEvents = {
        'tuanOrderStatus:change': function (e) {
            this.submitSearch(e);
        },
        'tuanId:change':function(e){
            this.submitSearch(e);
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'exclude:change': function (e) {
            this.submitSearch(e);
        },
        'batchRefundBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('refundOnline', {
                order_ids: u.pluck(items,'order_id')
            });
        },
        'table:command': function (e) {
            if(e.name === 'checkSale' || e.name === 'deal'){
                this.fire('CHECK_ORDER', {
                    orderId: e.args,
                    checkType: e.name
                });
            }
            else if (e.name === 'refundOnline') {
                this.fire('refundOnline', {
                    order_ids: [e.args]
                });
            }
            else if (e.name === 'refundOffline') {
                this.fire('refundOffline', {
                    order_id: [e.args]
                });
            }
            else if(e.name == 'makeDeal'){
                this.fire('makeDeal', {
                    id: e.args
                });
            }
            else {
                this.fire(e.name, {
                    name: e.args
                });
            }
        },
        'table:subrowopen': function (e) {
            var item = e.item;
            var htm = [];
            htm.push('<div class="row">');
            htm.push('<div class="col-xs-12">');
            htm.push('<h3 class="table-sub-info">' + (item.activity ? item.activity.name : '团购不存在了') + '</h3>');
            htm.push('</div>');
            htm.push('</div>');
            if(item.order){
                htm.push('<div class="row">');
                htm.push('<div class="col-xs-3">');
                htm.push('<p class="table-sub-info"><b>订单号：</b><span>' + item.order.order_id + '</span></p>');
                htm.push('</div>');
                var amount = utils.getAmount(item.order.amount);
                htm.push('<div class="col-xs-3">');
                htm.push('<p class="table-sub-info"><b>订单支付金额：</b><span>' + amount + '元</span></p>');
                htm.push('</div>');
                var payment = utils.getPaymentText(item.order.payment);
                htm.push('<div class="col-xs-3">');
                htm.push('<p class="table-sub-info"><b>支付方式：</b><span>' + payment + '</span></p>');
                htm.push('</div>');
                if (item.order.thirdPay) {
                    htm.push('<div class="col-xs-6">');
                    htm.push('<p class="table-sub-info"><b>支付单号（' + payment + '）：</b><span>' + item.order.thirdPay + '</span></p>');
                    htm.push('</div>');
                }
                htm.push('</div>');
            }
            var optm = {};
            u.each(item.options, function (opt) {
                if (optm[opt.option]) {
                    optm[opt.option].push(opt.value);
                }
                else {
                    optm[opt.option] = [opt.value];
                }
            });
            htm.push('<div class="row">');
            u.each(optm, function (opt, key) {
                htm.push('<div class="col-xs-3">');
                htm.push('<p class="table-sub-info"><b>' + key + '：</b><span>' + opt.join(', ') + '</span></p>');
                htm.push('</div>');
            });
            htm.push('</div>');
            e.target.setSubrowContent(htm.join(''), e.index);
        },
        'table:subrowclose': function (e) {
            e.target.getSubrowContainer(e.index).setContent('');
        }
    };

    require('er/util').inherits(GrouponSignupListView, ListView);
    return GrouponSignupListView;
});
