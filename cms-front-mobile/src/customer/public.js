/**
 * @file 
 * @author ()
 */

define(function (require) {
    var exports = {
        title: '客户管理'
    };

    exports.view = require('./publicView');

    exports.model = require('./publicModel');

    exports.events = {
        'view:claimedCustomer': function (param,index) {
            var me = this;
            this.model.claimedCustomer(param).fail(function () {
                me.view.vm.$refs.listview.refresh();
            }).then(function (data) {
                me.view.vm.customers[index].owner = true;
            });
        }
    };

    return exports;
});
