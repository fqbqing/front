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
        return this.model.messageJobList(query).then(function (page) {
            me.view.refresh(page);
        });


    }

    function updatedMessage(result) {
        if(result.id){
            this.redirect('/message/drafts~id=' + result.id);
        }else{
            this.redirect('/message/index~id=' + result.job_id.$id);
        }
    }

    /**
     * @protected
     * @override
     */
    MessageIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
        this.view.on('pageSizeChange', forwardToPage, this);
        this.on('updatedMessage',updatedMessage,this);
    };

    require('er/util').inherits(MessageIndex, BaseAction);
    return MessageIndex;
});
