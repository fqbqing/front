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
    function TuanEditProcess() {
        FormAction.apply(this, arguments);
    }

    TuanEditProcess.prototype.modelType = require('./ProcessModel');
    TuanEditProcess.prototype.viewType = require('./ProcessView');

    TuanEditProcess.prototype.redirectAfterSubmit = function (result) {
        var url = '/tuan/edit/gift~id=' + this.model.get('id');
        this.redirect(url);
    };

    /**
     * @protected
     * @override
     */
    TuanEditProcess.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(TuanEditProcess, FormAction);
    return TuanEditProcess;
});
