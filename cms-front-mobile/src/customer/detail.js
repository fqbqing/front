/**
 * @file 
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var exports = {
        title: '客户详情'
    };

    exports.view = require('./detailView');

    exports.model = require('./detailModel');

    exports.refreshCustomer = function () {
        var me = this;
        me.model.fetchCustomer().then(function (data) {
            if (data) {
                u.extend(me.view.vm.customer, data);
            }
        });
    };

    exports.events = {
        'view:UPDATE_CUSTOMER_RATING': function (rating) {
            var me = this;
            this.model.updateRating(rating).then(function () {
                me.view.vm.customer.rating = rating;
                me.view.showTip('设置分级成功', 'success');
                me.refreshCustomer();
                me.view.vm.$refs.listview.refresh();
            });
        },
        'view:ADD_CUSTOMER_TRACK': function (content) {
            var me = this;
            me.model.addCustomerTrack(content).then(function (data) {
                me.view.showTip('添加成功', 'success');
                me.view.vm.trackContent = '';
                data.user = {
                    name: '自己'
                };
                me.view.vm.tracks.unshift(data);
                me.refreshCustomer();
                me.view.vm.$refs.listview.refresh();
            });
        },
        'view:DISTRIBUTE_USER': function (content) {
            var me = this;
            me.startActivityForResult({
                url: '/user-company/list',
                query: {
                    group_id: me.model.get('user').organization.sale_group_id
                },
                title: '为客户分配销售'
            }).then(function(data){
               me.model.distributeUser({
                   user_company_id: data.id
               }).then(function (result) {
                   me.refreshCustomer();
                   me.view.vm.$refs.listview.refresh();
               });

            });
        },
        'view:EDIT_NAME': function (content) {
            var me = this;
            me.startActivityForResult({
                url: '/editItem',
                query: {
                    id: me.model.query.id,
                    keywords: me.model.get('customer').name,
                    placeholder: '输入客户姓名'

                },
                title: '更改客户姓名'

            }).then(function(data){
                me.model.updateCustomer({
                    id: me.model.query.id,
                    name: data.keywords
                }).then(function (result) {
                    me.refreshCustomer();
                    me.view.vm.$refs.listview.refresh();
                });
            });
        },
        'view:CLAIMED_CUSTOMER': function (content) {
            var me = this;
            this.model.claimedCustomer(content).fail(function () {
                me.redirect('/customer/public');
            }).then(function (data) {
                me.view.showTip('认领成功!', 'success');
                me.refreshCustomer();
                me.view.vm.$refs.listview.refresh();
            });

        }
    };

    return exports;
});
