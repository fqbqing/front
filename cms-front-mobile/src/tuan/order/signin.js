/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.view = require('./signinView');

    exports.model = require('./signinModel');

    exports.events = {
        'view:SIGN_IN': function () {
            var me = this;
            me.model.signIn().then(function () {
                me.view.showTip('签到成功', 'success');
                me.router.reset('/');
            });
        }
    };

    return exports;
});
