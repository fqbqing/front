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
    function MessageIndex() {
        BaseAction.apply(this, arguments);
    }

    MessageIndex.prototype.modelType = require('./IndexModel');
    MessageIndex.prototype.viewType = require('./IndexView');

    function forwardToPage(e) {
        var me = this;
        var query = {
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return this.model.getMessageList(query).then(function (pager) {
            pager.data = pager.data || pager.result;
            me.view.refresh(pager);
        });


    }
    function updatedUnreadCount(e) {
        var message = require('common/message');
        message.render();
    }


    /**
     * @protected
     * @override
     */
    MessageIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('pageSizeChange', forwardToPage, this);
        this.on('updatedUnreadCount', updatedUnreadCount, this);
    };

    require('er/util').inherits(MessageIndex, BaseAction);
    return MessageIndex;
});
