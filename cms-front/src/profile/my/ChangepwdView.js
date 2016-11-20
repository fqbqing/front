/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./changepwd.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MyChangepwdView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    MyChangepwdView.prototype.template = 'TPL_my_changepwd';

    /**
     * @inheritDoc
     */
    MyChangepwdView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    MyChangepwdView.prototype.uiEvents = {
    };

    require('er/util').inherits(MyChangepwdView, FormView);
    return MyChangepwdView;
});
