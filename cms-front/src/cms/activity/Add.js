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
    function ActivityAdd() {
        FormAction.apply(this, arguments);
    }

    ActivityAdd.prototype.modelType = require('./AddModel');
    ActivityAdd.prototype.viewType = require('./AddView');



    ActivityAdd.prototype.afterValidate = function (data) {
        var error = [];
        var flag = false;

        if (!data.image_default_id) {
            this.handleLocalValidationErrors({
                image_default_id: '请上传活动海报图'
            });
            flag = true;
        }
        if (error.length > 0) {
            this.handleLocalValidationErrors(error.join('、'));
            return Deferred.rejected();
        }
        if (flag) {
            return Deferred.rejected();
        }
        return true;
    };

    /**
     * @protected
     * @override
     */
    ActivityAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ActivityAdd, FormAction);
    return ActivityAdd;
});
