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
    function VoucherChooser() {
        ListAction.apply(this, arguments);
    }

    VoucherChooser.prototype.modelType = require('./ChooserModel');
    VoucherChooser.prototype.viewType = require('./ChooserView');

    function addVoucher(e) {
        this.redirect('/voucher/add',{
            global: true
        });
    }
    /**
     * @protected
     * @override
     */
    VoucherChooser.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addVoucher', addVoucher, this);
    };

    require('er/util').inherits(VoucherChooser, ListAction);
    return VoucherChooser;
});
