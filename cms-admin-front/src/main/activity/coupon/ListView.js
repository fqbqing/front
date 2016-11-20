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
    function ActivityCouponListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ActivityCouponListView.prototype.template = 'TPL_activity_coupon_list';

    var tableFields = [
        {
            field: 'image_url',
            title: '分享封面图片',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return '<img src="' + utils.imgUrl(item.share_image_url,60,60)+'" alt="分享封面图片" style="max-width: 100%;"/>';
            }
        },
        {
            field: 'name',
            title: '活动名称',
            content: 'name'
        },
        {
            field: 'start_time',
            title: '活动时间',
            sortable: true,
            stable: true,
            width: 320,
            align: 'center',
            content: function(item){
                return utils.dateFormat(item.start_time, 'YYYY-MM-DD HH:mm:ss')+'~'+utils.dateFormat(item.end_time, 'YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            field: 'customer_count',
            title: '客户数',
            align: 'center',
            stable: true,
            width: 100,
            content: 'customer_count'
        },
        {
            field: 'order_count',
            title: '领券数',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                return '<a href="#/order/voucher/list~activity_id='+ item.id +'">'+ item.order_count +'</a>'
            }
        },
        {
            field: 'status',
            title: '活动状态',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                if(item.status == 0) {
                    return '<i class="tuan-status tuan-status-offline">未上线</i>';
                }
                else if(item.status == 1) {
                    return '<i class="tuan-status tuan-status-online">已上线</i>';
                }
                else if(item.status == 2) {
                    return '<i class="tuan-status tuan-status-offline">已下线</i>';
                }
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
                str += '<a target="_blank" href="'+ constants.C_URL +'/activity/coupon/'+ item.id +'.html">查看</a>';
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
    ActivityCouponListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };
    ActivityCouponListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var search_type = this.get('search_type').getValue();
        var name = this.get('searchbox').getValue();
        if (name) {
            if (search_type == 1) {
                args.name = name;
            }
            else if(search_type == 0) {
                args.staff_name = name;
            }
        }
        return args;
    };
    /**
     * @inheritDoc
     */
    ActivityCouponListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(ActivityCouponListView, ListView);
    return ActivityCouponListView;
});
