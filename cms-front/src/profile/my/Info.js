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
    function MyInfo() {
        BaseAction.apply(this, arguments);
    }

    MyInfo.prototype.modelType = require('./InfoModel');
    MyInfo.prototype.viewType = require('./InfoView');

    /**
     * @protected
     * @override
     */
    MyInfo.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(MyInfo, BaseAction);
    return MyInfo;
});
