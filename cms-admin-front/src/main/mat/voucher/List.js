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
    function MatVoucherList() {
        ListAction.apply(this, arguments);
    }

    MatVoucherList.prototype.modelType = require('./ListModel');
    MatVoucherList.prototype.viewType = require('./ListView');

    /**
     * @protected
     * @override
     */
    MatVoucherList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(MatVoucherList, ListAction);
    return MatVoucherList;
});
