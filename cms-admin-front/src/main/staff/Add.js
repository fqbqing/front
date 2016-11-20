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
    function StaffAdd() {
        FormAction.apply(this, arguments);
    }

    StaffAdd.prototype.modelType = require('./AddModel');
    StaffAdd.prototype.viewType = require('./AddView');

    /**
     * @protected
     * @override
     */
    StaffAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(StaffAdd, FormAction);
    return StaffAdd;
});
