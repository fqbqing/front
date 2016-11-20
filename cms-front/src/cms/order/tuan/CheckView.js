/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./check.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrderTuanCheckView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderTuanCheckView.prototype.template = 'TPL_order_tuan_check';

    /**
     * @inheritDoc
     */
    OrderTuanCheckView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrderTuanCheckView.prototype.uiEvents = {};

    require('er/util').inherits(OrderTuanCheckView, FormView);
    return OrderTuanCheckView;
});
