/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function TuanEditSignup() {
        FormAction.apply(this, arguments);
    }

    TuanEditSignup.prototype.modelType = require('./SignupModel');
    TuanEditSignup.prototype.viewType = require('./SignupView');
    TuanEditSignup.prototype.redirectAfterSubmit = function (result) {
        var url = '/tuan/edit/coupon~id=' + this.model.get('id');
        if(!result.is_coupon){
            url = '/tuan/list';
        }
        this.redirect(url);
    };
    /**
     * @protected
     * @override
     */
    TuanEditSignup.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(TuanEditSignup, FormAction);
    return TuanEditSignup;
});
