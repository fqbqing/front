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
    var user = require('bat-ria/system/user');
    var constants = require('common/constants');


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
                return utils.getTuanOrderStatus(item.status);
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
                return item.sign_in_status == constants.SIGN_IN_STATUS_NO ? '未签到' : '<span class="status-label-hl">已签到</span>';
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
            title: '核销人',
            align: 'center',
       /*     stable: true,
            width: 100,*/
            content: function(item){
                return item.usedChannel ? item.usedChannel.name : '';
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            width: 100,
            content: function (item) {
                var str = '';
                //if(item.amount && user.isAllow('tuan-order.update')){
                str += '<a href="#/order/tuan/detail~order_id=' + item.order_id + '&amount='+item.amount+'">查看</a>';
                //}
                if(item.status == 2){
                    if (user.isAllow('tuan-order.refund')) {
                        str += '<a href="javascript:void(0)" data-command="refund" data-command-args="' + item.order_id + '">退款</a>';
                    }
                    if (user.isAllow('tuan-order.check-sale')) {
                        str += '<a href="javascript:void(0)" data-command="checkSale" data-command-args="' + item.order_id + '">核销</a>';
                    }
                }
                // 报名类活动，手动标记购车状态
                if ((item.status == 0 || item.status == 1) && item.car_buying_status == 0 && user.isAllow('tuan-order.deal')) {
                    str += '<a href="javascript:void(0)" data-command="deal" data-command-args="' + item.order_id + '">标为已购车</a>';
                }
                if(item.status == 4 && user.isAllow('tuan-order.refund')){
                    str += '<a href="javascript:void(0)" data-command="refund" data-command-args="' + item.order_id + '">退款</a>';
                }
                return str;
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
        if (this.model.get('tuan_id')) {
            args.tuan_id = this.model.get('tuan_id');
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    OrderTuanListView.prototype.uiEvents = {
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
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteTuanOrder', {
                    ids: [e.args]
                });
            }
            else if(e.name === 'checkSale' || e.name === 'deal'){
                //this.get('staticDg').show();
                this.fire('CHECK_ORDER', {
                    orderId: e.args,
                    checkType: e.name
                });
            }
            else if(e.name === 'refund'){
                this.fire('refund', {
                    order_id: e.args
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
        },
        'submit:click': function(e){
              this.fire('checkSale', {
                cn: this.get('cn').getValue()
             });
        }
    };
    require('er/util').inherits(OrderTuanListView, ListView);
    return OrderTuanListView;
});
