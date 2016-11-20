/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./info.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MyInfoView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    MyInfoView.prototype.template = 'TPL_my_info';

    /**
     * @inheritDoc
     */
    MyInfoView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    MyInfoView.prototype.uiEvents = {};

    require('er/util').inherits(MyInfoView, BaseView);
    return MyInfoView;
});
