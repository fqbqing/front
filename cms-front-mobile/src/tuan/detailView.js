/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    var u = require('underscore');

    exports.template = require('./detail.tpl.html');

	exports.templateMainTarget = 'TPL_tuan_detail';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            qrCodeImage: '',
            isQRCodeImageShow: false
        },
        computed: {
            buyedCarCount: function () {
                return u.reduce(u.pluck(this.statDealModel, 'count'), function (memo, num) {
                    return memo + num;
                }, 0);
            }
        },
        methods: {
            showShareQRCode: function () {
                //if (!this.qrCodeImage) {
                //    this.$view.emit('GET_QR_CODE', this.tuan_id);
                //}
                this.qrCodeImage = '/api/tuan/qrcode-share?id=' + this.tuan.id;
                this.isQRCodeImageShow = true;
            }
        }
    };

    return exports;
});

