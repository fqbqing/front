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
    function GoodCategoryAdd() {
        FormAction.apply(this, arguments);
    }

    GoodCategoryAdd.prototype.modelType = require('./AddModel');
    GoodCategoryAdd.prototype.viewType = require('./AddView');

    /**
     * @protected
     * @override
     */
    GoodCategoryAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodCategoryAdd, FormAction);
    return GoodCategoryAdd;
});
