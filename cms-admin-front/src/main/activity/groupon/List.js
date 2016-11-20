/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function ActivityGrouponList() {
        ListAction.apply(this, arguments);
    }

    ActivityGrouponList.prototype.modelType = require('./ListModel');
    ActivityGrouponList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    ActivityGrouponList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(ActivityGrouponList, ListAction);
    return ActivityGrouponList;
});
