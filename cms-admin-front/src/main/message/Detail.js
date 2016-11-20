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
    function MessageDetail() {
        BaseAction.apply(this, arguments);
    }

    MessageDetail.prototype.modelType = require('./DetailModel');
    MessageDetail.prototype.viewType = require('./DetailView');

    /**
     * @protected
     * @override
     */
    MessageDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(MessageDetail, BaseAction);
    return MessageDetail;
});
