/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var u = require('underscore');
    var exports = {};

    exports.template = require('./detail.tpl.html');

    exports.templateMainTarget = 'TPL_groupon_activity_detail';

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
                this.qrCodeImage = '/api/groupon-activity/qrcode-share?id=' + this.groupon.id;
                this.isQRCodeImageShow = true;
            }
        }
    };

    return exports;
});

