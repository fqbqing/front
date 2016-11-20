/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var Deferred = require('er/Deferred');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function TuanEditBase() {
        FormAction.apply(this, arguments);
    }

    TuanEditBase.prototype.modelType = require('./BaseModel');
    TuanEditBase.prototype.viewType = require('./BaseView');

    TuanEditBase.prototype.redirectAfterSubmit = function (result) {
        var url = '/tuan/edit/description~id=' + this.model.get('id');
        this.redirect(url);
    };
    TuanEditBase.prototype.afterValidate = function (data) {
        var flag = false;
        if (!data.image_default_id) {
            this.handleLocalValidationErrors({
                image_default_id: '请上传封面图片'
            });
            flag = true;
        }
        if (flag) {
            return Deferred.rejected();
        }
        data.theme = this.view.vue.selectedName;
        return true;
    };

    /**
     * @protected
     * @override
     */
    TuanEditBase.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(TuanEditBase, FormAction);
    return TuanEditBase;
});
