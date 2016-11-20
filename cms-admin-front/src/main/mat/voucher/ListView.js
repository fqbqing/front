/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MatVoucherListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    MatVoucherListView.prototype.template = 'TPL_mat_voucher_list';

    var tableFields = [
        {
            field: 'image_url',
            title: '图片',
            stable: true,
            width: '80',
            align: 'center',
            content: function (item) {
                return '<img src="'+ utils.imgUrl(item.image_url,60,60) +'">';

            }
        },{
            field: 'name',
            title: '优惠券名称',
            content: 'name'
        },
        {
            field: 'amount',
            title: '价格(元)',
            stable: true,
            width: '100',
            align: 'center',
            content: function (item) {
                return item.amount > 0 ? utils.getAmount(item.amount) : '免费';
            }
        },
        {
            field: 'start_time',
            title: '有效时间',
            stable: true,
            width: 220,
            align: 'center',
            content: function (item) {
                return item.start_time > 0 ? utils.dateFormat(item.start_time,'YYYY年MM月DD日')+ '～' +utils.dateFormat(item.end_time,'YYYY年MM月DD日') : '永久有效';
            }
        },
        {
            field: 'used_count',
            title: '已领取数量',
            stable: true,
            width: '100',
            align: 'center',
            content: 'used_count'
        },
        {
            field: 'count',
            title: '库存总数',
            stable: true,
            width: '100',
            align: 'center',
            content: function (item) {
                return item.count == -1 ? '无限' : item.count;
            }
        },
        {
            field: 'action',
            title: '操作',
            stable: true,
            width: 120,
            align: 'center',
            content: function (item) {
                var str = '';
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
    MatVoucherListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        },
        voucherType: {
            selectedIndex: 0,
            datasource: [
                {
                    name: '普通优惠券',
                    value: '1'
                },
                {
                    name: '经纪人优惠券',
                    value: '3'
                }
            ]
        }

    };
    MatVoucherListView.prototype.getExtraSearchArgs = function () {
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
    MatVoucherListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'voucherType:change': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(MatVoucherListView, ListView);
    return MatVoucherListView;
});
