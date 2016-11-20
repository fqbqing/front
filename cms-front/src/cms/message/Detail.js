/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var config = require('./config');


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

    function markRead() {
        var me = this;
        me.model.markRead().then(function (data) {
            var topAction = require('er/controller').currentAction;
            topAction.fire('updatedUnreadCount');
        });
    }
    /**
     * @protected
     * @override
     */
    MessageDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
        this.on('markRead', markRead, this);

        if (this.model.get('messageInfo').status == config.MESSAGE_STATUS_UNREAD) {
            this.fire('markRead');
        }
    };

    require('er/util').inherits(MessageDetail, BaseAction);
    return MessageDetail;
});
