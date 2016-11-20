/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.view = require('./dealView');

    exports.model = require('./dealModel');

    exports.events = {
        'view:CHECK_DEAL': function (intention) {
            var me = this;
            me.model.checkDeal({
                intention: intention
            }).then(function () {
                me.view.showTip('标记成功', 'success');
                //me.router.reset('/');
                history.back();
            });
        }
    };

    return exports;
});
