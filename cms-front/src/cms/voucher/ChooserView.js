/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./chooser.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function VoucherChooserView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    VoucherChooserView.prototype.template = 'TPL_voucher_chooser';

    var tableFields = [
         {
             field: 'name',
             title: '优惠券名称',
             content: 'name'
         },
         {
            field: 'count',
            title: '库存总数',
            align: 'center',
            content: function (item) {
                return item.count == -1 ? '无限' : item.count;
            }
         },
         {
            field: 'left_count',
            title: '剩余数量',
            align: 'center',
            content: function (item) {
                return item.count == -1 ? '无限' : item.count - item.used_count;
            }
         },
         {
            field: 'start_time',
            title: '有效时间',
            stable: true,
            width: 300,
            align: 'center',
            content: function (item) {
                return item.start_time > 0 ? utils.dateFormat(item.start_time,'YYYY年MM月DD日')+ '～' +utils.dateFormat(item.end_time,'YYYY年MM月DD日') : '永久有效';
            }
         }
    ];

    /**
     * @inheritDoc
     */
    VoucherChooserView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            selectMode: 'line',
            select: 'multi',
            noDataHtml: '<p style="margin:0;">还没有添加任何优惠券</p>'
        }

    };

    /**
     * @inheritDoc
     */
    VoucherChooserView.prototype.uiEvents = {
        'addVoucherBtn:click': function () {
            this.fire('addVoucher');
        }
    };

    require('er/util').inherits(VoucherChooserView, ListView);
    return VoucherChooserView;
});
