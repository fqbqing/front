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
    function MessageDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    MessageDetailModel.prototype.datasource = {
        messageInfo: function (model) {
            return api.getMessageInfo({
                id: model.get('id')
            });
        },
        config: function () {
            return config;
        }
    };

    MessageDetailModel.prototype.markRead = function (e) {
        return api.messageMarkRead({
            id: this.get('id')
        })
    };
    MessageDetailModel.prototype.messagePull = function (e) {
        return api.messagePull({},{showLoading: false});
    };
    // return模块
    require('er/util').inherits(MessageDetailModel, BaseModel);
    return MessageDetailModel;
});
