/**
 * @file 
 * @author ()
 */

define(function (require) {

    var user = require('common/user');
    var config = {
        title: '登录车大卖系统'
    };

    config.view = require('./loginView');

    config.model = require('./loginModel');

    config.events = {
        'complete': function () {
            if (user.isLogin) {
                var url = this.model.query.url || '/';
                this.redirect(url);
                //this.router.reset(url);
                //this.router.reset('/');
            }
        }
    };

    return config;

});
