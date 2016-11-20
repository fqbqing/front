/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function StaffAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    StaffAddView.prototype.template = 'TPL_staff_add';

    /**
     * @inheritDoc
     */
    StaffAddView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    StaffAddView.prototype.uiEvents = {};

    require('er/util').inherits(StaffAddView, FormView);
    return StaffAddView;
});
