/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./config');

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
        messageList: function () {
            return api.messageList({
                pageNo:1,
                pageSize:10
            }).then(function(pager){
                pager.data = pager.data || pager.result;
                return pager;
            });
        },
        config: function () {
            return config;
        }
    };
    MessageIndexModel.prototype.markRead = function (e) {
        return api.messageMarkRead({
            id: e.id
        })
    };

    MessageIndexModel.prototype.getMessageList = function (e) {
        return api.messageList({
            pageNo: e.pageNo,
            pageSize: e.pageSize
        })
    };
    // return模块
    require('er/util').inherits(MessageIndexModel, BaseModel);
    return MessageIndexModel;
});
