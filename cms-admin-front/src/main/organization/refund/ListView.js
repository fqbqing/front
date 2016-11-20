/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var constants = require('common/constants');
    var utils = require('common/utils');
    require('ui/Clipboard');
    var user = require('bat-ria/system/user');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationRefundListView() {
        ListView.apply(this, arguments);
    }
    OrganizationRefundListView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OrganizationRefundListView.prototype.template = 'TPL_organization_refund_list';

    var tableFields = [
         {
             field: 'id',
             title: '编号',
             stable: true,
             width: 100,
             align: 'center',
             subEntry: true,
             content: function (item) {
                 return '#' + item.id;
             }
         },

         {
             field: 'receiving_side',
             title: '收款人',
             align: 'center',
             content: 'receiving_side'
         },
         {
            field: 'receiving_account',
            title: '收款账号',
            align: 'center',
            content: 'receiving_account'
         },
         {
            field: 'staff_name',
            title: '操作人',
            align: 'center',
            content: 'staff_name'
         },
         {
            field: 'updated_time',
            title: '提交时间',
            stable: true,
            width: 140,
            align: 'center',
            content: function (item) {
                return item.updated_time == item.created_time ? '-' : utils.dateFormat(item.updated_time);
            }
         },
         {
            field: 'created_time',
            title: '创建时间',
            stable: true,
            width: 140,
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
         },

         {
            field: 'status',
            title: '状态',
            stable: true,
            width: 140,
            align: 'center',
            content: function (item) {
                return !!item.sign ? '<i class="tuan-status tuan-status-online">已确认</i>' : '<i class="tuan-status tuan-status-offline">未确认</i>';
            }
         },
         {
            field: 'action',
            title: '操作',
            stable: true,
            width: 140,
            align: 'center',
            content: function (item) {
                var str = '';
                if (!item.sign) {
                    str +=' <div data-ui-group="copyBtn"'+
                        'data-ui-type="Clipboard"'+
                        'data-ui-clipboard-text="'+ constants.B_URL + '/refund/?id=' + item.id +'"' +
                        'style="color: #3291da;cursor: pointer;display: inline-block">复制链接</div>';
                }
                if (!!item.sign) {
                    str += '<a target="_blank" href="/api/refund/print?id='+ item.id +'">打印</a>';
                }
                if (user.isAllow('refund.delete') && !item.sign) {
                    str += '<a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                }
                return str;
            }
         }
    ];

    /**
     * @inheritDoc
     */
    OrganizationRefundListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            subrow: true,
            columnResizable: true,
            columnRenderIndexes: [7]

        }

    };

    /**
     * @inheritDoc
     */
    OrganizationRefundListView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteRefund', {
                    ids: [e.args]
                });
            }

        },
        'addRefundBtn:click': function () {
            this.fire('addRefund');
        },
        'table:subrowopen': function (e) {
            var item = e.item;
            var htm = [];
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>退款负责人：</dt><dd>' + item.userCompany.name + '</dd>');
            htm.push('</dl>');
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>退款金额：</dt><dd>' + utils.getAmount(item.amount) + '元</dd>');
            htm.push('</dl>');
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>收款事由：</dt><dd>' + item.reason + '</dd>');
            htm.push('</dl>');
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>开户银行：</dt><dd>' + item.receiving_bank + '</dd>');
            htm.push('</dl>');
            htm.push('<dl class="dl-horizontal">');
            htm.push('<dt>经手人：</dt><dd>' + item.handler + '</dd>');
            htm.push('</dl>');
            if(!!item.sign){
                htm.push('<dl class="dl-horizontal">');
                htm.push('<dt>收款人签字：</dt><dd><img src="'+ item.sign +'" alt="" style="max-width: 100px;max-height:100px;"></dd>');
                htm.push('</dl>');
            }
            e.target.setSubrowContent(htm.join(''), e.index);
        },
        'table:subrowclose': function (e) {
            e.target.getSubrowContainer(e.index).setContent('');
        }
    };

    OrganizationRefundListView.prototype.enterDocument = function () {
        var me = this;
        ListView.prototype.enterDocument.apply(this);
        this.getGroup('copyBtn').each(function (btn) {
            btn.on('aftercopy', function (e) {
                me.showToast('复制成功！');
            });
        });
    };

    require('er/util').inherits(OrganizationRefundListView, ListView);
    return OrganizationRefundListView;
});
