/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function MessageDraftsModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    MessageDraftsModel.prototype.datasource = {
        draftsPager: function () {
            return api.messageJobDraftList({
                pageNo:1,
                pageSize:10
            }).then(function(pager){
                pager.data = pager.data || pager.result;
                return pager;
            });
        }
    };

    MessageDraftsModel.prototype.messageJobDraftList = function (query) {
        return api.messageJobDraftList(query);
    };


    // return模块
    require('er/util').inherits(MessageDraftsModel, BaseModel);
    return MessageDraftsModel;
});
