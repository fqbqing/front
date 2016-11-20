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
    function GoodProductAdd() {
        FormAction.apply(this, arguments);
    }

    GoodProductAdd.prototype.modelType = require('./AddModel');
    GoodProductAdd.prototype.viewType = require('./AddView');

    /**
     * @protected
     * @override
     */
    GoodProductAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodProductAdd, FormAction);
    return GoodProductAdd;
});
