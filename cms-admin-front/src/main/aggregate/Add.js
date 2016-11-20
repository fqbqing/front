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
    function AggregateAdd() {
        FormAction.apply(this, arguments);
    }

    AggregateAdd.prototype.modelType = require('./AddModel');
    AggregateAdd.prototype.viewType = require('./AddView');

    AggregateAdd.prototype.handleSubmitResult = function (result) {
        var toast = this.getToastMessage(result);
        if (toast) {
            this.view.showToast(toast);
        }
        this.fire('aftersubmit', {
            result: result
        });
    };


    /**
     * @protected
     * @override
     */
    AggregateAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here

    };

    require('er/util').inherits(AggregateAdd, FormAction);
    return AggregateAdd;
});
