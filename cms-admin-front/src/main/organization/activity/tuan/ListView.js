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
    function OrganizationActivityTuanListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationActivityTuanListView.prototype.template = 'TPL_organization_activity_tuan_list';

    var tableFields = [

        {
            field: 'image_url',
            title: '封面图片',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return '<img src="' + item.image_url + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
            }
        },
        {
            field: 'title',
            title: '活动名称',
            width: 160,
            content: 'title'
        },
        {
            field: 'order_count',
            title: '订单数',
            align: 'center',
            content: function (item) {
                return '<a href="#/order/tuan/list~tuan_id=' + item.id + '" title="点击查看订单">' + item.order_count + '</a>';
            }
        },
        {
            field: 'tuan_time',
            title: '活动时间',
            sortable: true,
            align: 'center',
            stable: true,
            width: 160,
            content: function(item){
                return utils.dateFormat(item.tuan_time, 'YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            field: 'adress',
            title: '活动地点',
            align: 'center',
            width: 100,
            content: 'address'
        },
        {
            field: 'amount',
            title: '意向金(元)',
            stable: true,
            align: 'center',
            width: 80,
            content: function (item) {
                return utils.getAmount(item.amount);
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
            width: 150,
            content: function (item) {
                var str = '';
                str += '<a target="_blank" href="'+ constants.C_URL +'/tuan/index?tuanId=' + item.id + '">查看</a>';
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
    OrganizationActivityTuanListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有任何活动</p>',
            organizationId: '@organization_id'
        }

    };

    OrganizationActivityTuanListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var search_type = this.get('search_type').getValue();
        var title = this.get('searchbox').getValue();
        if (title) {
            if (search_type == 1) {
                args.title = title;
            }
            else if(search_type == 0) {
                args.staff_name = title;
            }
        }
        return args;
    };
    /**
     * @inheritDoc
     */
    OrganizationActivityTuanListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }

    };

    require('er/util').inherits(OrganizationActivityTuanListView, ListView);
    return OrganizationActivityTuanListView;
});
