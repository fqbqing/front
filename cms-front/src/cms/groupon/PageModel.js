/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var user = require('bat-ria/system/user').visitor;
    var Deferred = require('er/Deferred');

    var u = require('underscore');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function GrouponPageModel() {
        BaseModel.apply(this, arguments);
    }

    GrouponPageModel.prototype.compoments = {
        TITLE: {
            type: 'TITLE',
            text: '这里填写标题',
            style: ''
        },
        ARTICLE: {
            type: 'ARTICLE',
            data: {
                title: '这里填写标题',
                content: '这里填写正文'
            }
        },
        ARTICLE_GROUP: {
            type: 'ARTICLE_GROUP',
            data: [{
                title: '这里填写标题',
                content: '这里填写正文'
            },{
                title: '这里填写标题',
                content: '这里填写正文'
            }]
        },
        PARAGRAPH: {
            type: 'PARAGRAPH',
            text: '段落内容'
        },
        IMAGE: {
            type: 'IMAGE',
            url: ''
        },
        IMAGE_TEXT: {
            type: 'IMAGE_TEXT',
            url: '',
            text: '这里是图片描述信息'
        }
    };

    function defaultPageInfo() {
        return {
            theme: 'default',
            global: {
                price: '现场公布价格',
                organization_name: user.organization.name,
                address: user.organization.address,
                buytips: '温馨提示：现场订车用户请携身份证和订金（现金或刷卡皆可）以便现场办理订车手续'
            },
            items: []
        };
    }

    /**
     * 对pageinfo进行检查，对不完善的进行初始化
     * @param info
     * @returns {*}
     */
    function fixPageInfo(info) {
        var defaults = defaultPageInfo();
        if (info) {
            info = u.defaults(info, defaults);
        }
        else {
            return defaults;
        }
        return info;
    }

    /**
     * @inheritDoc
     */
    GrouponPageModel.prototype.datasource = {
        grouponInfo: {
            name: 'groupon',
            dump: false,
            retrieve: function (model) {
                var deferred = new Deferred();
                api.getGrouponById({
                    id: model.get('id')
                }).then(function (data) {
                    model.set('pageInfo', data.page_info ? fixPageInfo(JSON.parse(data.page_info)) : defaultPageInfo());
                    model.set('signupOptions', data.option ? JSON.parse(data.option) : []);
                    delete data.page_info;
                    delete data.option;
                    deferred.resolve(data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }
    };

    GrouponPageModel.prototype.save = function (data) {
        var param = {
            id: this.get('id'),
            stage: 'ui',
            page_info: JSON.stringify(data.pageInfo),
            option: JSON.stringify(data.signupOptions)
        };
        return api.updateGroupon(param);
    };

    // return模块
    require('er/util').inherits(GrouponPageModel, BaseModel);
    return GrouponPageModel;
});
