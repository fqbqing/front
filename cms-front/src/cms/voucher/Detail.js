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
    function VoucherDetail() {
        FormAction.apply(this, arguments);
    }

    VoucherDetail.prototype.modelType = require('./DetailModel');
    VoucherDetail.prototype.viewType = require('./DetailView');

    /**
     * @protected
     * @override
     */
    VoucherDetail.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(VoucherDetail, FormAction);
    return VoucherDetail;
});
