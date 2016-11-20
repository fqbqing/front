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
    function TuanEditGift() {
        FormAction.apply(this, arguments);
    }

    TuanEditGift.prototype.modelType = require('./GiftModel');
    TuanEditGift.prototype.viewType = require('./GiftView');

    TuanEditGift.prototype.redirectAfterSubmit = function (result) {
        var url = '/tuan/edit/signup~id=' + this.model.get('id');
        this.redirect(url);
    };

    /**
     * @protected
     * @override
     */
    TuanEditGift.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(TuanEditGift, FormAction);
    return TuanEditGift;
});
