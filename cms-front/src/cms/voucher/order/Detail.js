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
    function VoucherOrderDetail() {
        BaseAction.apply(this, arguments);
    }

    VoucherOrderDetail.prototype.modelType = require('./DetailModel');
    VoucherOrderDetail.prototype.viewType = require('./DetailView');

    /**
     * @protected
     * @override
     */
    VoucherOrderDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherOrderDetail, BaseAction);
    return VoucherOrderDetail;
});
