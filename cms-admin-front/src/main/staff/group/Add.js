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
    function StaffGroupAdd() {
        FormAction.apply(this, arguments);
    }

    StaffGroupAdd.prototype.modelType = require('./AddModel');
    StaffGroupAdd.prototype.viewType = require('./AddView');

    /**
     * @protected
     * @override
     */
    StaffGroupAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(StaffGroupAdd, FormAction);
    return StaffGroupAdd;
});
