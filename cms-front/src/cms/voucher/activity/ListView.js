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
    var constants = require('common/constants');
    var user = require('bat-ria/system/user');
    var level = require('common/level');

    require('esui/Tip');
    require('ui/ToggleButton');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherActivityListView() {
        ListView.apply(this, arguments);
    }

    VoucherActivityListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    VoucherActivityListView.prototype.template = 'TPL_voucher_activity_list';

    var tableFields = [
        {
            field: 'image_url',
            title: '封面图片',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return '<img src="' + utils.imgUrl(item.share_image_url,60,60)+'" alt="分享封面图片"/>';
            }
        },
        {
            field: 'name',
            title: '活动名称',
            content: function (item) {
                return '<a href="#/voucher/activity/detail~id='+ item.id +'">'+ item.name +'</a>'
            }
        },
        {
            field: 'start_time',
            title: '活动时间',
            sortable: true,
            stable: true,
            width: 160,
            align: 'center',
            content: function(item){
                return utils.dateFormat(item.start_time, 'YYYY-MM-DD HH:mm:ss')+' - </br>'+utils.dateFormat(item.end_time, 'YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            field: 'customer_count',
            title: '客户数',
            align: 'center',
            stable: true,
            width: 90,
            content: 'customer_count'
        },
        {
            field: 'order_count',
            title: '领券数',
            stable: true,
            align: 'center',
            width: 90,
            tip: '领券数=未使用数+已使用数+未支付数',
            content: function (item) {
                return '<a href="#/voucher/order/list~activity_id=' + item.id + '" title="点击查看所有订单">' + item.order_count + '</a>';
            }
        },
        {
            field: 'status',
            title: '活动状态',
            stable: true,
            align: 'center',
            width: 100,
            content: function (item) {
                var onText = '已上线';
                var offText = item.status == constants.ACTIVITY_STATUS_NOT_ONLINE ? '未上线' : '已下线';
                var checked = item.status == constants.ACTIVITY_STATUS_ONLINE ? true : false;

                if(checked){
                    return '<div data-ui-type="ToggleButton" data-ui-group="statusBtn" data-ui-activityid="' + item.id + '" data-ui-status="' + item.status + '" data-ui-on-text="'+ onText +'" data-ui-off-text="'+ offText +'" data-ui-checked="checked"></div>';
                }
                return '<div data-ui-type="ToggleButton" data-ui-group="statusBtn" data-ui-activityid="' + item.id + '" data-ui-status="' + item.status + '" data-ui-on-text="'+ onText +'" data-ui-off-text="'+ offText +'"></div>';
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            stable: true,
            width: 160,
            content: function (item) {
                var str = '';
                str += '<a target="_blank" href="'+ constants.C_URL + '/activity/coupon/'+ item.id +'.html?source=' + user.visitor.source+'">预览</a>';
                str += '<a href="#/voucher/activity/detail~id=' + item.id + '">详情</a>';

                if (user.isAllow('coupon-activity.update') && level.isAllow('coupon-activity.update')) {
                    str += ' <a href="#/voucher/activity/edit/base~id=' + item.id + '">修改</a>';
                }
                if (user.isAllow('coupon-activity.delete') && level.isAllow('coupon-activity.delete')) {
                    str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    VoucherActivityListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有添加任何优惠券活动<br>'+ ((user.isAllow('coupon-activity.add') && level.isAllow('coupon-activity.add')) ? '<a href="#/voucher/activity/add">立即添加</a>' : '') +'</p>',
            columnRenderIndexes: [6]
        }

    };
    VoucherActivityListView.prototype.getVueOptions = function () {
        return {
        };
    };
    VoucherActivityListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var name = this.get('searchbox').getValue();
        if (name) {
            args.name = name;
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    VoucherActivityListView.prototype.uiEvents = {
        'addVoucherActivityBtn:click': function () {
            this.fire('addVoucherActivity');
        },
        'deleteVoucherActivityBtn:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            this.fire('deleteVoucherActivity', {
                ids: u.pluck(items,'id')
            });
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteVoucherActivity', {
                    ids: [e.args]
                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };


    VoucherActivityListView.prototype.enterDocument = function () {
        var me = this;
        ListView.prototype.enterDocument.apply(this);
        this.getGroup('statusBtn').each(function (btn) {
            if (!user.isAllow('coupon-activity.commit')) {
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
                    width: 400
                }).then(function () {
                    me.fire('commitVoucherActivity',{
                        id: e.target.activityid,
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

    require('er/util').inherits(VoucherActivityListView, ListView);
    return VoucherActivityListView;
});
