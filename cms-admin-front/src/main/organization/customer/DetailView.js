/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');
    var utils = require('common/utils');
    var $ = require('jquery');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationCustomerDetailView() {
        BaseView.apply(this, arguments);
    }
    OrganizationCustomerDetailView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationCustomerDetailView.prototype.template = 'TPL_organization_customer_detail';

    /**
     * @inheritDoc
     */
    OrganizationCustomerDetailView.prototype.uiProperties = {

    };
    OrganizationCustomerDetailView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {

            },
            ready: function () {

            },
            methods: {

            }
        };
    };

    var tuanFields =[
        {
            field: 'order_id',
            title: '订单号',
            align: 'left',
            stable: true,
            width: 150,
            content: 'order_id'
        },
        {
            field: 'title',
            title: '活动名称',
            align: 'left',
            content: function (item) {
                return item.tuan ? item.tuan.title : '';
            }
        },
        {
            field: 'status',
            title: '订单状态',
            align: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                return utils.getTuanStatus(item.status);
            }
        },
        {
            field: 'amount',
            title: '支付金额（元）',
            stable: true,
            width: 150,
            content:  function (item) {
                var str = '';
                if(item.amount){
                    str = utils.getAmount(item.amount);
                }
                str += '<br>(' + utils.getPaymentText(item.payment) + ')';
                return str;

            }
        },
        {
            field: 'name',
            title: '姓名/手机号',
            stable: true,
            width: 100,
            content: function (item) {
                return item.name + '<br>' + item.phone;
            }
        },
        {
            field: 'intention',
            title: '意向车型',
            stable: true,
            width: 100,
            content: 'intention'
        },
        {
            field: 'created_time',
            title: '报名时间',
            align: 'center',
            stable: true,
            width: 180,
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        }
    ];
    var exhibitionFields =[
        {
            field: 'orderId',
            title: '订单号',
            subEntry: true,
            stable: true,
            width: 180,
            content: 'order_id'
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
            field: 'signupChannel',
            title: '报名渠道',
            align: 'center',
            content: function(item){
                return item.signupChannel ? item.signupChannel.name : '';
            }
        }
    ];


    var grouponFields = [
        {
            field: 'name',
            title: '活动名称',
            align: 'left',
            stable: true,
            subEntry: true,
            width: 200,
            content: function(item){
               return item.activity ? item.activity.name : '无';
            }
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
    OrganizationCustomerDetailView.prototype.uiProperties = {
        'tuanTable': {
            fields: tuanFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>'
        },
        'exhibitionTable': {
            fields: exhibitionFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>'

        },
        'grouponTable': {
            fields: grouponFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有报名</p>'
        }
    };

    /**
     * @inheritDoc
     */
    OrganizationCustomerDetailView.prototype.uiEvents = {

    };


    require('er/util').inherits(OrganizationCustomerDetailView, BaseView);
    return OrganizationCustomerDetailView;
});
