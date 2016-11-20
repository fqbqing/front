/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var $ = require('zepto');
    var exports = {};

    exports.view = require('./tuanView');

    exports.model = require('./tuanModel');

    exports.actions = {
        changeCity: function (store, city) {
            store.dispatch('CHANGE_CITY', city);
            this.context.changeCity(city);
        }
    };

    exports.changeCity = function (city) {
        $.closePanel(true);
        this.redirect('/s/tuan/' + city.id);
    };

    exports.events = {
        'view:loadTuanByPage': function (page) {
            var me = this;
            me.redirect(me.path, {
                page: page
            });
        }
    };

    return exports;
});
