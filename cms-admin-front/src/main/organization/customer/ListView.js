/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    var cons = require('common/constants');
    var u = require('underscore');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationCustomerListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationCustomerListView.prototype.template = 'TPL_organization_customer_list';

    var tableFields = [
        {
            field: 'name',
            title: '姓名',
            align: 'center',
            content: 'name'
        },
        {
            field: 'phone',
            title: '手机号',
            align: 'center',
            content: 'phone'
        },
        {
            field: 'channel_name',
            title: '渠道',
            align: 'center',
            content: function(item){
                return item.channel ? item.channel.name : '';
            }
        },
        {
            field: 'owner_name',
            title: '销售顾问',
            align: 'center',
            content: function(item){
                if (item.owner) {
                    return '<a href="#/organization/customer/list~organization_id=' + item.organization_id + '&user_company_id=' + item.owner.id + '">'
                        + item.owner.name + '</a>';
                }
                return '无';
            }
        },
        {
            field: 'rating',
            title: '客户等级',
            content: function(item){
                var text = item.rating;
                var item = u.find(cons.CUSTOMER_RATING,function(ele){
                    return item.rating == ele.value;
                });
                var ratingName = item ? item.text : '';
                text += '' + ratingName;
                return text;
            }
        },
        {
            field: 'created_time',
            title: '录入时间',
            stable: true,
            width: 160,
            content: function(item){
                return utils.dateFormat(item.created_time);
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
                str += '<a href="#/organization/customer/detail~id=' + item.id + '">查看详情</a>';
                return str;
            }
        }
    ];


    /**
     * @inheritDoc
     */
    OrganizationCustomerListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };

    /**
     * @inheritDoc
     */
    OrganizationCustomerListView.prototype.uiEvents = {};

    require('er/util').inherits(OrganizationCustomerListView, ListView);
    return OrganizationCustomerListView;
});
