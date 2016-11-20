/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function StaffList() {
        ListAction.apply(this, arguments);
    }

    StaffList.prototype.modelType = require('./ListModel');
    StaffList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    StaffList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(StaffList, ListAction);
    return StaffList;
});
