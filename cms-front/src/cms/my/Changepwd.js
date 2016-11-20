/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    var user = require('bat-ria/system/user');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function MyChangepwd() {
        FormAction.apply(this, arguments);
    }

    MyChangepwd.prototype.modelType = require('./ChangepwdModel');
    MyChangepwd.prototype.viewType = require('./ChangepwdView');

    MyChangepwd.prototype.redirectAfterSubmit = function (result) {
        if (user.visitor.needPasswordChange) {
            window.location.href = '/';
        }
        else {
            this.redirect('/my/info');
        }
    };

    /**
     * @protected
     * @override
     */
    MyChangepwd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(MyChangepwd, FormAction);
    return MyChangepwd;
});
