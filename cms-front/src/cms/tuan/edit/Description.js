/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var moment = require('moment');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function TuanEditDescription() {
        FormAction.apply(this, arguments);
    }

    TuanEditDescription.prototype.modelType = require('./DescriptionModel');
    TuanEditDescription.prototype.viewType = require('./DescriptionView');

    TuanEditDescription.prototype.redirectAfterSubmit = function (result) {
        var url = '/tuan/edit/gift~id=' + this.model.get('id');
        this.redirect(url);
    };
    /*TuanEditDescription.prototype.afterValidate = function (data) {
        var error = [];
        var tuan_time = moment(data.tuan_time).unix();
        var end_time = moment(data.end_time).unix();
        if (end_time < tuan_time) {
            error.push('活动结束日期不能小于活动开始日期');
        }
        if (error.length > 0) {
            this.handleLocalValidationErrors(error.join('、'));
            return Deferred.rejected();
        }

        return true;
    };*/

    /**
     * @protected
     * @override
     */
    TuanEditDescription.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
    };

    require('er/util').inherits(TuanEditDescription, FormAction);
    return TuanEditDescription;
});
