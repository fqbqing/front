/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GoodSpecificationValues() {
        BaseAction.apply(this, arguments);
    }

    GoodSpecificationValues.prototype.modelType = require('./ValuesModel');
    GoodSpecificationValues.prototype.viewType = require('./ValuesView');

    /**
     * @protected
     * @override
     */
    GoodSpecificationValues.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(GoodSpecificationValues, BaseAction);
    return GoodSpecificationValues;
});
