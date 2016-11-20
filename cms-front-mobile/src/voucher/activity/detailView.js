/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    var u = require('underscore');

    exports.template = require('./detail.tpl.html');

	exports.templateMainTarget = 'TPL_voucher/activity_detail';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            qrCodeImage: '',
            isQRCodeImageShow: false
        },
        methods: {
            showShareQRCode: function () {
                //if (!this.qrCodeImage) {
                //    this.$view.emit('GET_QR_CODE', this.id);
                //}
                this.qrCodeImage = '/api/activity/qrcode-share?id=' + this.query.id;
                this.isQRCodeImageShow = true;
            }
        }
    };

    return exports;
});

