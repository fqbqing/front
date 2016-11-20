/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.view = require('./changepwdView');

    exports.model = require('./changepwdModel');

    exports.events = {
        'view:CHANGE_PASSWORD': function (old, newp) {
            var me = this;
            this.model.updatePassword(old, newp).then(function () {
                me.view.showTip('修改成功', 'success');
                history.back();
            });
        }
    };

    return exports;
});
