/**
 * @file 
 * @author ()
 */

define(function (require) {

    var user = require('common/user');
    var exports = {
        title: '个人中心'
    };

    exports.view = require('./infoView');

    exports.model = require('./infoModel');

    exports.events = {
        'view:logout': function () {
            var me = this;
            this.model.logout().then(function () {
                user.destroy();
                me.redirect('/login');
            });
        }
    };

    return exports;
});
