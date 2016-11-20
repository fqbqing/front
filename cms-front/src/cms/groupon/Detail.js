/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    var consts = require('common/constants');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GrouponDetail() {
        BaseAction.apply(this, arguments);
    }

    GrouponDetail.prototype.modelType = require('./DetailModel');
    GrouponDetail.prototype.viewType = require('./DetailView');

    GrouponDetail.prototype.initShare = function () {
        var groupon = this.model.get('groupon');
        var shareLink = this.model.get('shareLink');
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdText": "活动推荐：" + groupon.name + ' ' + shareLink,
                "bdMini": "2",
                "bdUrl": shareLink,
                "bdPic": "http:" + consts.CDN_URL + this.model.get('groupon').image,
                "bdStyle": "1",
                "bdSize": "16"
            },
            "share": {
                "bdSize": 16
            }
        };
        window._bd_share_main.init();
    };

    /**
     * @protected
     * @override
     */
    GrouponDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        //this.initShare();
    };

    require('er/util').inherits(GrouponDetail, BaseAction);
    return GrouponDetail;
});
