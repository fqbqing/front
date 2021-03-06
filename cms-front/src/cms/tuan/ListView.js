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
    require('esui/Tip');
    var user = require('bat-ria/system/user');
    require('ui/ToggleButton');
    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanListView() {
        ListView.apply(this, arguments);
    }

    TuanListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    TuanListView.prototype.template = 'TPL_tuan_list';

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
            title: '团购名称',
            width: 160,
            content: function (item) {
                return '<a href="#/tuan/detail~tuan_id=' + item.id + '" title="点击查看活动详情">' + item.title + '</a>';
            }
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
            title: '团购时间',
            sortable: true,
            align: 'center',
            width: 100,
            content: function(item){
                return utils.dateFormat(item.tuan_time, 'YYYY-MM-DD<br>HH:mm:ss');
            }
        },
        {
            field: 'adress',
            title: '团购地点',
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
            title: '团购状态',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                var onText = '已上线';
                var offText = item.status == constants.ACTIVITY_STATUS_NOT_ONLINE ? '未上线' : '已下线';
                var checked = item.status == constants.ACTIVITY_STATUS_ONLINE ? true : false;

                if(checked){
                    return '<div data-ui-type="ToggleButton" data-ui-group="statusBtn" data-ui-tuanid="' + item.id + '" data-ui-status="' + item.status + '" data-ui-on-text="'+ onText +'" data-ui-off-text="'+ offText +'" data-ui-checked="checked"></div>';
                }
                return '<div data-ui-type="ToggleButton" data-ui-group="statusBtn" data-ui-tuanid="' + item.id + '" data-ui-status="' + item.status + '" data-ui-on-text="'+ onText +'" data-ui-off-text="'+ offText +'"></div>';
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
                str += '<a target="_blank" href="/api/tuan/preview?id=' + item.id + '">预览</a>';
                str += '<a href="#/tuan/detail~tuan_id=' + item.id + '" title="点击查看活动详情">详情</a>';
                if (user.isAllow('tuan.update')) {
                    str += ' <a href="#/tuan/edit/base~id=' + item.id + '">修改</a>';
                }
                if (user.isAllow('tuan.delete')) {
                    str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    TuanListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何团购<br>'+ (user.isAllow('tuan.add') ? '<a href="#/tuan/add">立即添加</a>' : '') +'</p>',
            columnRenderIndexes: [7]
        }

    };

    TuanListView.prototype.getVueOptions = function () {
        return {
        };
    };

    TuanListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var title = this.get('searchbox').getValue();
        if (title) {
            args.title = title;
        }
        return args;
    };
    /**
     * @inheritDoc
     */
    TuanListView.prototype.uiEvents = {
        'addTuanBtn:click': function () {
            this.fire('addTuan');
        },
        'deleteTuanBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteTuan', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteTuan', {
                    ids: [e.args]
                });
            }
            else if(e.name === 'offlineAggregate'){
                this.fire('offlineAggregate', {
                    related_id: e.args,
                    activity_type: 1,
                    online: 0
                });
            }
            else if(e.name === 'onlineAggregate'){
                this.fire('onlineAggregate', {
                    related_id: e.args,
                    activity_type: 1,
                    online: 1
                });
            }
            else if(e.name === 'refreshAggregate'){
                var param = e.args.split(',');
                this.fire('refreshAggregate', {
                    tuan_id: param[0],
                    aggregate_id: param[1]

                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }

    };

    TuanListView.prototype.enterDocument = function () {
        var me = this;
        ListView.prototype.enterDocument.apply(this);
        this.getGroup('statusBtn').each(function (btn) {
            if (!user.isAllow('tuan.commit')) {
                btn.disable();
            }
            btn.on('change', function (e) {
                var status = e.target.status == constants.ACTIVITY_STATUS_ONLINE ? constants.ACTIVITY_STATUS_OFFLINE : constants.ACTIVITY_STATUS_ONLINE;
                var comfirmTitle = '';
                var comfirmStr = '';
                var toastStr = '';
                if(status == constants.ACTIVITY_STATUS_ONLINE) {
                    comfirmTitle = '活动上线';
                    comfirmStr = '确定要上线吗？';
                    toastStr = '已完成上线！';
                }
                else {
                    comfirmTitle = '活动下线';
                    comfirmStr = '确定要下线吗？';
                    toastStr = '已完成下线！';
                }
                me.waitConfirm({
                    title: comfirmTitle,
                    content: comfirmStr,
                    width: 300
                }).then(function () {
                    me.fire('commitTuan',{
                        id: e.target.tuanid,
                        status: status,
                        btn: btn
                    });
                },function () {
                    btn.disable();
                    btn.setProperties({
                        checked: !e.target.checked
                    });
                    btn.enable();
                });

            });
        });
    };

    require('er/util').inherits(TuanListView, ListView);
    return TuanListView;
});
