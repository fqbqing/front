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
    function MessageIndexModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    MessageIndexModel.prototype.datasource = {
        noticePager: function () {
            return api.messageJobList({
                pageNo:1,
                pageSize:10
            }).then(function(pager){
                pager.data = pager.data || pager.result;
                return pager;
            });
        }
       
    };
    MessageIndexModel.prototype.messageJobList = function (query) {
        return api.messageJobList(query);
    };

    // return模块
    require('er/util').inherits(MessageIndexModel, BaseModel);
    return MessageIndexModel;
});
