/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    var u = require('underscore');
    var config = require('./config');
    var user = require('bat-ria/system/user');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function CustomerListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    CustomerListView.prototype.template = 'TPL_customer_list';

    var tableFields =[
        //{
        //    field: 'id',
        //    title: '客户ID',
        //    stable: true,
        //    width: 120,
        //    content: 'id'
        //},
        {
            field: 'name',
            title: '姓名',
            align: 'center',
            content: function (item) {
                return '<a href="#/customer/info~id=' + item.id + '">' + item.name + '</a>';
            }
        },
        {
            field: 'phone',
            title: '手机号',
            align: 'center',
            content: 'phone'
        },
        {
            field: 'channel',
            title: '注册渠道',
            align: 'center',
            content: function(item) {
                return item.channel ? item.channel.name : '';
            }
        },
        {
            field: 'owner',
            title: '销售顾问',
            align: 'center',
            content: function(item){
                if (item.owner) {
                    return '<a href="#/user/customer/list~user_company_id=' + item.owner.id + '">'
                        + item.owner.name + '</a>';
                }
                return '无';
            }
        },
        {
            field: 'rating',
            title: '客户等级',
            sortable: true,
            content: function(item){
                var text = item.rating;
                var item = u.find(config.allRating,function(ele){
                    return item.rating == ele.value
                });
                var ratingName = item ? item.name : '未分级';
                text += ratingName;
                return text;
            }
        },
        {
            field: 'created_time',
            title: '录入时间',
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
                if (user.isAllow('customer.distribute') || user.isAllow('customer.distribute-public')) {
                    str += '<a href="javaScript:void(0)" data-command="distribute" data-command-args="' + item.id + ',' + item.user_company_id + '">分配</a>';
                }
                str += '<a href="#/customer/info~id=' + item.id + '">详情</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    CustomerListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };
    CustomerListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var phone = this.get('searchbox').getValue();
        if (phone) {
            args.phone = phone;
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    CustomerListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'table:command': function (e) {
            if (e.name === 'distribute') {
                var data = e.args.split(',');
                this.fire('distribute', {
                    //客户ID
                    id: data[0],
                    //当前选中用户对应的销售顾问ID，用来判断是有归属客户还是无归属客户，为0是无归属用户
                    cur_user_company_id: data[1]
                });
            }

        },
        'ownerStatus:change': function (e) {
            this.submitSearch(e);
        },
        'rating:change': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(CustomerListView, ListView);
    return CustomerListView;
});
