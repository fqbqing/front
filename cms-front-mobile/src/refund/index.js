/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {};

    exports.view = require('./indexView');

    exports.model = require('./indexModel');

    exports.events = {
        'view:UPDATE': function (sign) {
            var me = this;
            this.model.update(sign).then(function () {
                me.view.vm.refund.sign = sign;
            });
        }
    };

    return exports;
});

