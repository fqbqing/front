/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MessageDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    MessageDetailView.prototype.template = 'TPL_message_detail';

    /**
     * @inheritDoc
     */
    MessageDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    MessageDetailView.prototype.uiEvents = {};

    require('er/util').inherits(MessageDetailView, BaseView);
    return MessageDetailView;
});
