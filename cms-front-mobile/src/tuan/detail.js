/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '团购详情'
    };

    exports.view = require('./detailView');

    exports.model = require('./detailModel');

    exports.events = {
        'view:GET_QR_CODE': function (id) {
            var me = this;
            this.model.getQRCode().then(function (url) {
                me.view.vm.qrCodeImage = url;
            });
        }
    };

    return exports;
});
