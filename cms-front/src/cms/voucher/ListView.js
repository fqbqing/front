/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    var user = require('bat-ria/system/user');
    var level = require('common/level');
    var config = require('./config');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherListView() {
        ListView.apply(this, arguments);
    }
    VoucherListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    VoucherListView.prototype.template = 'TPL_voucher_list';

    var tableFields = [
        {
            field: 'image_url',
            title: '图片',
            algin: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                return '<img src="'+ utils.imgUrl(item.image_url,60,60) +'">';

            }
        },
        {
            field: 'name',
            title: '优惠券名称',
            content: function (item) {
                var str = [
                    '<h3>' + item.name + '</h3>',
                    '<p>' + item.brief + '</p>'
                ];
                return str.join('');
            }
        },
        {
            field: 'type',
            title: '优惠券类型',
            align: 'center',
            content: function (item) {
                if (item.type == config.VOUCHER_TYPE_COMMON) {
                    return '普通优惠券'
                }
                else if (item.type == config.VOUCHER_TYPE_AGENT) {
                    return '经纪人优惠券'
                }
            }
        },
        {
            field: 'used_count',
            title: '已领取数量',
            align: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                return '<a href="#/voucher/order/list~voucher_id=' + item.id + '">' + item.used_count + '</a>';
            }
        },
        {
            field: 'count',
            title: '库存总数',
            align: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                return item.count == -1 ? '无限' : item.count;
            }
        },
        {
            field: 'amount',
            title: '价格(元)',
            align: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                return item.amount > 0 ? utils.getAmount(item.amount) : '免费';
            }
        },
        {
            field: 'start_time',
            title: '有效时间',
            stable: true,
            width: 240,
            align: 'center',
            content: function (item) {
                return item.start_time > 0 ? utils.dateFormat(item.start_time,'YYYY年MM月DD日')+ '～' +utils.dateFormat(item.end_time,'YYYY年MM月DD日') : '永久有效';
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            width: 100,
            align: 'center',
            content: function (item) {
                var str = '';
                if(user.isAllow('voucher.add') && level.isAllow('voucher.add')){
                    str += ' <a href="#/voucher/add~id='+ item.id +'" class="aggregate-btn">修改</a>';
                }
                if(user.isAllow('voucher.delete') && level.isAllow('voucher.delete')){
                    str += ' <a href="javascript:void(0)" data-command="delete" data-command-args="' + item.id + '" class="aggregate-btn">删除</a>';
                }

                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    VoucherListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        },
        voucherType: {
            selectedIndex: 0,
            datasource: config.VOUCHER_TYPE_LIST
        }

    };
    VoucherListView.prototype.getVueOptions = function () {
        return {
        };
    };

    VoucherListView.prototype.getExtraSearchArgs = function () {
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
    VoucherListView.prototype.uiEvents = {
         'addVoucherBtn:click': function () {
             this.fire('addVoucher');
         },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteVoucher', {
                    ids: [e.args]
                });
            }

        },
        'voucherType:change': function (e) {
            this.submitSearch(e);
        }

    };

    require('er/util').inherits(VoucherListView, ListView);
    return VoucherListView;
});
