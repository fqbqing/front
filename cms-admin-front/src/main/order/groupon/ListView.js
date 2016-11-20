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

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrderGrouponListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderGrouponListView.prototype.template = 'TPL_order_groupon_list';

    var tableFields = [
        {
            field: 'name',
            title: '姓名',
            align: 'left',
            stable: true,
            subEntry: true,
            width: 200,
            content: function(item){
                var customerName = item.customer ? item.customer.name : null;
                var showName = item.username;
                if(customerName){
                    showName = item.username == customerName ? item.username : item.username + '(' + customerName + ')';
                    return '<a href="#/organization/customer/detail~id=' + item.customer.id + '" title="查看客户详情">' + showName + '</a>';
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
            width: 90,
            content: function (item) {
                return item.signin_status == 0 ? '未签到' : '<span class="status-label-hl">已签到</span>';
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
        }
    ];

    /**
     * @inheritDoc
     */
    OrderGrouponListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            subrow: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有报名</p>'
        }

    };

    OrderGrouponListView.prototype.getExtraSearchArgs = function () {
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
    OrderGrouponListView.prototype.uiEvents = {
        'tuanStatus:change': function (e) {
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
        'table:subrowopen': function (e) {
            var item = e.item;
            var htm = [];
            htm.push('<div class="row">');
            htm.push('<div class="col-md-12">');
            htm.push('<p class="table-sub-info"><b>活动名称：</b><span>' + (item.activity ? item.activity.name : '活动不存在了') + '</span></p>');
            htm.push('</div>');
            htm.push('</div>');
            if(item.order){
                htm.push('<div class="row">');
                htm.push('<div class="col-md-3">');
                htm.push('<p class="table-sub-info"><b>订单号：</b><span>' + item.order.order_id + '</span></p>');
                htm.push('</div>');
                var amount = utils.getAmount(item.order.amount);
                htm.push('<div class="col-md-3">');
                htm.push('<p class="table-sub-info"><b>订单支付金额：</b><span>' + amount + '元</span></p>');
                htm.push('</div>');
                var payment = utils.getPaymentText(item.order.payment);
                htm.push('<ddiv class="col-md-3">');
                htm.push('<p class="table-sub-info"><b>支付方式：</b><span>' + payment + '</span></p>');
                htm.push('</div></div>');
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
                htm.push('<div class="col-md-3">');
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

    require('er/util').inherits(OrderGrouponListView, ListView);
    return OrderGrouponListView;
});
