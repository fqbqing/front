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
    function ImageAdd() {
        BaseAction.apply(this, arguments);
    }

    ImageAdd.prototype.modelType = require('./AddModel');
    ImageAdd.prototype.viewType = require('./AddView');

    /**
     * @protected
     * @override
     */
    ImageAdd.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ImageAdd, BaseAction);
    return ImageAdd;
});
