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
    function OrderExihibitionListView() {
        ListView.apply(this, arguments);
    }

    OrderExihibitionListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrderExihibitionListView.prototype.template = 'TPL_order_exihibition_list';

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
            content: function(item){
                return utils.getExhibitionStatus(item.status);
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
            field: 'signup_channel_name',
            title: '报名渠道',
            align: 'center',
            content: function(item){
                return item.signupChannel ? item.signupChannel.name : '';
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrderExihibitionListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            subrow:true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>'
        }
    };


    OrderExihibitionListView.prototype.getExtraSearchArgs = function () {
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
    OrderExihibitionListView.prototype.uiEvents = {
        'exhibitionStatus:change': function (e) {
            this.submitSearch(e);
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'table:subrowopen': function (e) {
            var item = e.item;
            var htm = [];
            if(item.exhibitionCouponActivity){
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>活动名称：</dt><dd>' + item.exhibitionCouponActivity.exhibitionCoupon.activity_title + '</dd>');
                htm.push('</dl>');
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>优惠券名称：</dt><dd>' + item.exhibitionCouponActivity.exhibitionCoupon.coupon + '</dd>');
                htm.push('</dl>');
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>优惠券有效时间：</dt><dd>' + utils.dateFormat(item.exhibitionCouponActivity.exhibitionCoupon.coupon_start_time)+ '-' + utils.dateFormat(item.exhibitionCouponActivity.exhibitionCoupon.coupon_end_time) + '</dd>');
                htm.push('</dl>');

            }
            if(item.status == 2|| item.status == 3){
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>使用时间：</dt><dd>' + utils.dateFormat(item.updated_time) + '</dd>');
                htm.push('</dl>');
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>成交车型：</dt><dd>' + item.deal_model + '</dd>');
                htm.push('</dl>');
            }



            e.target.setSubrowContent(htm.join(''), e.index);
        },
        'table:subrowclose': function (e) {
            e.target.getSubrowContainer(e.index).setContent('');
        },
    };

    require('er/util').inherits(OrderExihibitionListView, ListView);
    return OrderExihibitionListView;
});
