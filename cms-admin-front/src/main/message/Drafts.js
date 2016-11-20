/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var moment = require('moment');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function MessageDrafts() {
        BaseAction.apply(this, arguments);
    }

    MessageDrafts.prototype.modelType = require('./DraftsModel');
    MessageDrafts.prototype.viewType = require('./DraftsView');

    function forwardToPage(e) {
        var me = this;
        var query = {
            pageNo : e.page,
            pageSize : e.pageSize
        };

        return this.model.messageJobDraftList(query).then(function (page) {
            me.view.refresh(page);
        });


    }
    function updatedMessage(result) {
        if(result.id){
            this.redirect('/message/drafts~_='+ moment().unix()+'&id=' + result.id);
        }else{
            this.redirect('/message/index~id=' + result.job_id.$id);
        }
    }
    /**
     * @protected
     * @override
     */
    MessageDrafts.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);
        if(this.model.get('id')){
            this.view.get('actionPanel').reload({id: this.model.get('id')});
        }
        // bind event handlers here
        this.view.on('pageSizeChange', forwardToPage, this);
        this.on('updatedMessage',updatedMessage,this);

    };

    require('er/util').inherits(MessageDrafts, BaseAction);
    return MessageDrafts;
});
