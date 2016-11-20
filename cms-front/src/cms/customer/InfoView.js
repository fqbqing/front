/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./info.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');
    var utils = require('common/utils');
    var $ = require('jquery');
    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function CustomerInfoView() {
        BaseView.apply(this, arguments);
    }
    CustomerInfoView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    CustomerInfoView.prototype.template = 'TPL_costomer_info';

    var exhibitionFields =[
        {
            field: 'order_id',
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
            field: 'signup_channel_name',
            title: '报名渠道',
            align: 'center',
            content: function(item){
                return item.signupChannel ? item.signupChannel.name : '';
            }
        },

        {
            field: 'action',
            title: '操作',
            align: 'center',
            width: 100,
            content: function (item) {
                var str = '';
                str += '<a href="#/exhibition/coupon/order/detail~order_id='+item.order_id+'">查看</a>';
                return str;
            }
        }
    ];
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
                return utils.getTuanOrderStatus(item.status);
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
            width: 100,
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
                var str = '';
                if(item.amount){
                    str = '<a href="#/order/tuan/detail~order_id=' + item.order_id + '&amount='+item.amount+'">查看</a>';
                }
                return str;
            }
        }
    ];
    var voucherFields = [
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
            content:  function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'amount',
            title: '优惠券价格',
            align: 'center',
            content: 'amount'
        },
        {
            field: 'status',
            title: '优惠券状态',
            align: 'center',
            content:  function (item) {
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
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            content: function (item) {
                var str = '';
                str += '<a href="#/voucher/order/detail~id=' + item.id + '">查看</a>';
                return str;
            }
        }
    ];
    var grouponFields =[
        {
            field: 'name',
            title: '活动名称',
            align: 'left',
            content: function (item) {
                return item.activity ? item.activity.name : '';
            }
        },
        {
            field: 'status',
            title: '订单状态',
            align: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                return item.order ? utils.getVoucherOrderStatus(item.order.status) : '已报名';
            }
        },
        {
            field: 'amount',
            title: '支付金额（元）',
            stable: true,
            width: 150,
            content:  function (item) {
                var str = '';
                if(item.order){
                    str = utils.getAmount(item.order.amount);
                }
                return str;

            }
        },
        {
            field: 'name',
            title: '姓名/手机号',
            content: function (item) {
                return item.username + '<br>' + item.phone;
            }
        },
        {
            field: 'signup',
            title: '报名信息',
            content: function (item) {
                var ret = [];
                u.each(item.options, function (opt) {
                    ret.push('<label>' + opt.value + '</label>');
                });
                return ret.join(', ');
            }
        },
        {
            field: 'signin_status',
            title: '签到',
            align: 'center',
            stable: true,
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
            field: 'created_time',
            title: '报名时间',
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        }
    ];
    /**
     * @inheritDoc
     */
    CustomerInfoView.prototype.uiProperties = {
        'exhibitionTable': {
            fields: exhibitionFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>'
        },
        'tuanTable': {
            fields: tuanFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有订单</p>'
        },
        'voucherTable': {
            fields: voucherFields,
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
    CustomerInfoView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                isShowEditBox: false,
                isRating: true,
                isNaming: true
            },
            ready: function () {

            },
            methods: {
                ratingToggle: function(){
                    this.isRating = !this.isRating;
                    me.get('ratingSele').setValue(this.userInfo.rating);
                },
                nameToggle: function(){
                    this.isNaming = !this.isNaming;
                    me.get('customer-name').setValue(this.userInfo.name);
                },
                editTrack: function(index){
                    var that = this;
                    that.trackList[index].isShow = true;
                },
                deleteTrack:  function(index){
                    var that = this;
                    me.fire('deleteTrack',{
                        track_id: that.trackList[index].id
                    })
                },
                cancelTrack: function(index){
                    var that = this;
                    me.get('textLine'+index).setValue(this.trackList[index].content);
                    that.trackList[index].isShow = false;

                },
                updateTrack: function(index){
                    var that = this;
                    var content = me.get('textLine'+index).getValue();
                    me.fire('updateTrack',{
                        track_id: that.trackList[index].id,
                        content: content
                    })
                },
                showEditBox: function(){
                    this.isShowEditBox = true;
                },
                addTrack: function(){
                    var that = this;
                    var content = me.get('textLine').getValue();
                    me.fire('addTrack',{
                        content: content
                    })
                },
                addCancel: function(){
                    me.get('textLine').setValue('');
                    this.isShowEditBox = false;
                },
                distribute: function(){
                    me.fire('distribute',{
                        id: this.userInfo.id, //客户ID
                        cur_user_company_id: this.userInfo.user_company_id //当前选中用户对应的销售顾问ID，用来判断是有归属客户还是无归属客户，为0是无归属用户
                    });
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    CustomerInfoView.prototype.uiEvents = {
        'updateRating:click': function(e){
            this.fire('updateRating',{
                rating:  this.get('ratingSele').getValue()
            });
        },
        'updateName:click': function(e){
            this.fire('updateName',{
                name:  this.get('customer-name').getValue()
            });
        },
        'pager:pagechange': function (e) {
            this.forwardToPage(e);

        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        }
    };

    CustomerInfoView.prototype.forwardToPage = function (e) {
        var pager = this.get('pager');
        var page = e.target.get('page');
        var pageSize = e.target.get('pageSize');
        if(!pager.isDisabled()){
            this.fire('pageSizeChange', {page: page, pageSize: pageSize});
        }
    };
    /**
     * 根据Model数据重新渲染页面
     */
    CustomerInfoView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };

    /**
     * 根据Model数据重新渲染列表
     */
    CustomerInfoView.prototype.refreshList = function (page) {
        var model = this.model;
        this.vue.trackList = page;
        var pager = this.get('pager');
        pager.disable();
        if (pager) {
           pager.setProperties(
                {
                    count: page.totalCount,
                    page: page.pageNo,
                    pageSize: page.pageSize
                },
                {silent: true}
            );
        }
        pager.enable();
    };


    require('er/util').inherits(CustomerInfoView, BaseView);
    return CustomerInfoView;
});
