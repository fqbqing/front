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
    function OrderTuanListView() {
        ListView.apply(this, arguments);
    }
    OrderTuanListView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OrderTuanListView.prototype.template = 'TPL_order_tuan_list';
    var tableFields = [
        {
            field: 'order_id',
            title: '订单号',
            subEntry: true,
            stable: true,
            width: 180,
            content: 'order_id'
        },
        {
            field: 'name',
            title: '姓名',
            align: 'left',
            stable: true,
            width: 200,
            content: function(item){
                var customerName = item.customer ? item.customer.name : null;
                var showName = item.name;
                if(customerName){
                    showName = item.name == customerName ? item.name : item.name + '(' + customerName + ')';
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
                return utils.getTuanStatus(item.status);
            }
        },
        //{
        //    field: 'payment',
        //    title: '支付方式',
        //    align: 'center',
        //  /*  stable: true,
        //    width: 140,*/
        //    content:function(item){
        //        return utils.getPaymentText(item.payment);
        //    }
        //},
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
            field: 'sign_in_status',
            title: '签到',
            align: 'center',
            stable: true,
            width: 90,
            content: function (item) {
                return item.sign_in_status == 0 ? '未签到' : '<span class="status-label-hl">已签到</span>';
            }
        },
        {
            field: 'signup_channel_name',
            title: '报名渠道',
            align: 'center',
            /*     stable: true,
             width: 100,*/
            content: function(item){
                return item.signupChannel ? item.signupChannel.name : '';
            }
        },
        {
            field: 'used_channel_name',
            title: '核销渠道',
            align: 'center',
            /*     stable: true,
             width: 100,*/
            content: function(item){
                return item.usedChannel ? item.usedChannel.name : '';
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrderTuanListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            subrow:true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>'
        }

    };
    OrderTuanListView.prototype.getVueOptions = function () {
        return {
        };
    };

    OrderTuanListView.prototype.getExtraSearchArgs = function () {
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
    OrderTuanListView.prototype.uiEvents = {
        'tuanStatus:change': function (e) {
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
            var amount = '';
            if(item.amount){
                amount = utils.getAmount(item.amount);
            }
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>团购名称：</dt><dd>' + (item.tuan ? item.tuan.title : '团购不存在了') + '</dd>');
            htm.push('</dl>');
            if(item.tuan.is_coupon == '1'){
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>订单支付金额：</dt><dd>' + amount + '元</dd>');
                htm.push('</dl>');
                var payment = utils.getPaymentText(item.payment);
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>支付方式：</dt><dd>' + payment + '</dd>');
                htm.push('</dl>');
                htm.push('<dl class="dl-horizontal">');
                var payTime = utils.dateFormat(item.pay_time) || '未支付';
                htm.push('<dt>支付时间：</dt><dd>' + payTime + '</dd>');
                htm.push('</dl>');
            }
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>意向车型：</dt><dd>' + item.intention + '</dd>');
            htm.push('</dl>');
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>意向购车方式：</dt><dd>' + utils.mapCarBuyWay(item.car_buying_way) + '</dd>');
            htm.push('</dl>');
            if(item.car_buying_status == 1){
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>成交车型：</dt><dd>' + item.deal_model + '</dd>');
                htm.push('</dl>');
            }
            e.target.setSubrowContent(htm.join(''), e.index);
        },
        'table:subrowclose': function (e) {
            e.target.getSubrowContainer(e.index).setContent('');
        }
    };
    require('er/util').inherits(OrderTuanListView, ListView);
    return OrderTuanListView;
});
