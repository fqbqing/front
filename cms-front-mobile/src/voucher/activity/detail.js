/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '优惠券活动详情'
    };

    exports.view = require('./detailView');

    exports.model = require('./detailModel');

    exports.events = {
        'view:GET_QR_CODE': function () {
            var me = this;
            this.model.getQRCode().then(function (url) {
                me.view.vm.qrCodeImage = url;
            });
        }
    };

    return exports;
});
