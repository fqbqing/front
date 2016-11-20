/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./description.tpl.html');
    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanEditDescriptionView() {
        FormView.apply(this, arguments);
    }
    /**
     * @inheritDoc
     */
    TuanEditDescriptionView.prototype.template = 'TPL_tuan_edit_description';

    /**
     * @inheritDoc
     */
    TuanEditDescriptionView.prototype.uiProperties = {

    };


    /**
     * @inheritDoc
     */
    TuanEditDescriptionView.prototype.uiEvents = {
    };

    require('er/util').inherits(TuanEditDescriptionView, FormView);
    return TuanEditDescriptionView;
});
