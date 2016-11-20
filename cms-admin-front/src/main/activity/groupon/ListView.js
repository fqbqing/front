/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    require('esui/Tip');
    var user = require('bat-ria/system/user');

    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ActivityGrouponListView() {
        ListView.apply(this, arguments);
    }

    ActivityGrouponListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    ActivityGrouponListView.prototype.template = 'TPL_activity_groupon_list';

    var tableFields = [
        {
            field: 'image',
            title: '封面图片',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return '<img src="' + item.image + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
            }
        },
        {
            field: 'name',
            title: '活动名称',
            width: 160,
            content: 'name'
        },
        {
            field: 'order_count',
            title: '报名数',
            align: 'center',
            content: function (item) {
                return '<a href="#/order/groupon/list~activity_id=' + item.id + '" title="点击查看订单">' + item.customer_count + '</a>';
            }
        },
        {
            field: 'activity_time',
            title: '活动时间',
            align: 'center',
            width: 100,
            content: function(item){
                return utils.dateFormat(item.activity_time, 'YYYY-MM-DD<br>HH:mm:ss');
            }
        },
        {
            field: 'amount',
            title: '意向金(元)',
            stable: true,
            align: 'center',
            width: 80,
            content: function (item) {
                return item.intention ? utils.getAmount(item.intention.amount) : '免费';
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
        //{
        //    field: 'aggregate',
        //    title: '聚合推广',
        //    stable: true,
        //    tip: '<p><em>聚合推广：</em>是车大卖平台推出的在线推广模块，商户开启推广后，可进行自动的搜索引擎优化，享受平台的联合推广流量，作为新的推广渠道。 </p><p><em>开启：</em>开启在线聚合推广；</p><p><em>关闭：</em>关闭在线聚合推广；</p><p><em>刷新：</em>聚合推广的展示是按照活动更新时间排序的，刷新可以更新活动时间，获得更多的展示机会。</p>',
        //    align: 'center',
        //    width: 120,
        //    content: function (item) {
        //        var str = '';
        //        if(item.status == 1) {
        //            if(item.aggregate && item.aggregate.online == 1) {
        //                if(user.isAllow('aggregate.offline')){
        //                    str += ' <a href="javascript:void(0)" data-command="offlineAggregate" data-command-args="' + item.id + '" class="aggregate-btn">关闭</a>';
        //                }
        //                if(user.isAllow('aggregate.refresh')){
        //                    str += ' <a href="javascript:void(0)" data-command="refreshAggregate" data-command-args="' + item.id + ',' + item.aggregate.id + '" class="aggregate-btn">刷新时间</a>';
        //                }
        //            }
        //            else {
        //                if(user.isAllow('aggregate.online')){
        //                    str += ' <a href="javascript:void(0)" data-command="onlineAggregate" data-command-args="' + item.id + '" class="aggregate-btn">开启</a>';
        //                }
        //            }
        //        }
        //       return str;
        //    }
        //},
        {
            field: 'action',
            title: '操作',
            align: 'center',
            width: 150,
            content: function (item) {
                var str = '';
                str += '<a target="_blank" href="'+ constants.C_URL +'/activity/groupon/'+ item.id +'.html">查看</a>';
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
    ActivityGrouponListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }
    };
    ActivityGrouponListView.prototype.getExtraSearchArgs = function () {
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
    ActivityGrouponListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };


    require('er/util').inherits(ActivityGrouponListView, ListView);
    return ActivityGrouponListView;
});
