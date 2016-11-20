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
    var constants = require('common/constants');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function UserCustomerListView() {
        ListView.apply(this, arguments);
    }

    UserCustomerListView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    UserCustomerListView.prototype.template = 'TPL_user_customer_list';

    var tableFields =[
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
            field: 'rating',
            title: '客户等级',
            content: function(item){
                var text = item.rating;
                var item = u.find(constants.CUSTOMER_RATING_LIST, function(ele){
                    return item.rating == ele.value
                });
                var ratingName = item ? item.text : '';
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
                if (user.isAllow('customer.distribute')) {
                    str += '<a href="javaScript:void(0)" data-command="distribute" data-command-args="' + item.id + '">分配</a>';
                }
                str += '<a href="#/customer/info~id=' + item.id + '">详情</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    UserCustomerListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            select: 'multi',
            columnResizable: true
        }
    };

    UserCustomerListView.prototype.getExtraSearchArgs = function () {
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
    UserCustomerListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'distributeCustomer:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            if (items.length > 0) {
                this.fire('distributeCustomer', {
                    ids: u.pluck(items, 'id')
                });
            }
            else {
                this.waitAlert('请选择要分配的客户');
            }
        },
        'releaseCustomer:click': function () {
            var table = this.get('table');
            var items = table.getSelectedItems();
            if (items.length > 0) {
                this.fire('releaseCustomer', {
                    ids: u.pluck(items, 'id')
                });
            }
            else {
                this.waitAlert('请选择要释放的客户');
            }
        },
        'table:command': function (e) {
            if (e.name === 'distribute') {
                var id = e.args;
                this.fire('distributeCustomer', {
                    //客户ID
                    ids: [id]
                });
            }
        }
    };

    require('er/util').inherits(UserCustomerListView, ListView);
    return UserCustomerListView;
});
