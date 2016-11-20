/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    var constants = require('common/constants');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationActivityExihibitionListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationActivityExihibitionListView.prototype.template = 'TPL_organization_activity_exihibition_list';

    var tableFields = [
        {
            field: 'activity_title',
            title: '活动名称',
            align: 'center',
            content: function (item) {
                return item.exhibitionCoupon ? item.exhibitionCoupon.activity_title : ''
            }
        },

        {
            field: 'order_count',
            title: '订单数',
            align: 'center',
            stable: true,
            width: 50,
            content: function (item) {
                return '<a href="#/order/exihibition/list~exhibition_coupon_activity_id=' + item.id + '" title="点击查看订单">' + item.order_count + '</a>';
            }
        },
        {
            field: 'activity_start_time',
            title: '活动时间',
            align: 'center',
            stable: true,
            width: 200,
            content: function(item){
                return  item.exhibitionCoupon ? utils.dateFormat(item.exhibitionCoupon.activity_start_time, 'YYYY-MM-DD HH:mm:ss') : '';
            }
        },
        {
            field: 'activity_address',
            title: '活动地点',
            align: 'center',
            content: function (item) {
                return item.exhibitionCoupon ? item.exhibitionCoupon.activity_address : ''
            }
        },
        {
            field: 'coupon',
            title: '优惠券名称',
            align: 'center',
            content: function (item) {
                return item.exhibitionCoupon ? item.exhibitionCoupon.coupon : ''
            }
        },
        {
            field: 'coupon_time',
            title: '优惠券有效时间',
            align: 'center',
            stable: true,
            width: 200,
            content: function (item) {
                return item.exhibitionCoupon ? utils.dateFormat(item.exhibitionCoupon.coupon_start_time, 'YYYY-MM-DD HH:mm:ss') + '<br>-<br>' + utils.dateFormat(item.exhibitionCoupon.coupon_end_time, 'YYYY-MM-DD HH:mm:ss') : '';
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
                str += '<a target="_blank" href="'+ constants.C_URL +'/coupon/index?activityId=' + item.id + '">查看</a>';
                if(!this.organizationId){
                    str += '<a href="#/organization/detail~organization_id=' + item.organization_id + '">所属4S店详情</a>';
                }
                return str;
            }
        }
    ];
    /**
     * @inheritDoc
     */
    OrganizationActivityExihibitionListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有任何活动</p>',
            organizationId: '@organization_id'
        }

    };

    /**
     * @inheritDoc
     */
    OrganizationActivityExihibitionListView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationActivityExihibitionListView, ListView);
    return OrganizationActivityExihibitionListView;
});
