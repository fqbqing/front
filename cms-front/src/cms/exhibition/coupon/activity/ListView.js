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
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ExhibitionCouponActivityListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityListView.prototype.template = 'TPL_exhibition_coupon_activity_list';

    var tableFields = [
        {
            field: 'activity_title',
            title: '活动名称',
            align: 'center',
            content: function (item) {
                return '<a href="#/exhibition/coupon/activity/detail~exhibition_id=' + item.id + '" title="点击查看订单">' + item.activity_title + '</a>';
            }
        },

        {
            field: 'order_count',
            title: '订单数',
            align: 'center',
            stable: true,
            width: 50,
            content: function (item) {
                return '<a href="#/exhibition/coupon/order/list~exhibition_coupon_activity_id=' + item.id + '" title="点击查看订单">' + item.order_count + '</a>';
            }
        },
        {
            field: 'activity_start_time',
            title: '活动时间',
            align: 'center',
            stable: true,
            width: 200,
            content: function(item){
                return utils.dateFormat(item.activity_start_time, 'YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            field: 'activity_address',
            title: '活动地点',
            align: 'center',
            content: 'activity_address'
        },
        {
            field: 'coupon',
            title: '优惠券名称',
            align: 'center',
            content: 'coupon'
        },
        {
            field: 'coupon_time',
            title: '优惠券有效时间',
            align: 'center',
            stable: true,
            width: 200,
            content: function (item) {
                return utils.dateFormat(item.coupon_start_time, 'YYYY-MM-DD HH:mm:ss') + '<br>-<br>' + utils.dateFormat(item.coupon_end_time, 'YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            field: 'status',
            title: '活动状态',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                return '<i class="tuan-status tuan-status-online">已上线</i>';

            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            stable: true,
            width: 150,
            content: function (item) {
                var str = '';
                str += '<a target="_blank" href="/api/exhibition-coupon-activity/preview?id=' + item.id + '">查看</a>';
                str += ' <a target="_blank" href="/api/exhibition-coupon-activity/transmit?id='+item.id+'">分享</a>';
                str += ' <a href="javascript:void(0)" data-command="qrcodebtn" data-command-args="' + item.id + ',' + item.activity_title + '">二维码</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };

    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityListView.prototype.uiEvents = {
        'table:command': function (e) {
            if(e.name === 'qrcodebtn'){
                var args = e.args.split(',');
                this.fire('shareExhibitionQrcode', {
                    id: args[0],
                    title: args[1]
                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(ExhibitionCouponActivityListView, ListView);
    return ExhibitionCouponActivityListView;
});
