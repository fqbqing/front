/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GrouponPage() {
        BaseAction.apply(this, arguments);
    }

    GrouponPage.prototype.modelType = require('./PageModel');
    GrouponPage.prototype.viewType = require('./PageView');

    function savePage(e) {
        var me = this;
        this.model.save({
            pageInfo: e.pageInfo,
            signupOptions: e.signupOptions
        }).then(function () {
            //me.view.showToast('保存成功');
            me.view.showDialog({
                title: '提示信息',
                needFoot: true,
                width: 400,
                okText: '继续编辑',
                cancelText: '返回活动列表',
                content: '<div style="text-align: center; margin-top: 20px;">已保存此次活动编辑</div>',
                onOk: function () {
                    return true;
                },
                onCancel: function () {
                    me.redirect('/groupon/list');
                }
            });
        });
    }

    /**
     * @protected
     * @override
     */
    GrouponPage.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('SAVE', savePage, this);
    };

    require('er/util').inherits(GrouponPage, BaseAction);
    return GrouponPage;
});
