/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./drafts.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MessageDraftsView() {
        BaseView.apply(this, arguments);
    }

    MessageDraftsView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    MessageDraftsView.prototype.template = 'TPL_message_drafts';

    /**
     * @inheritDoc
     */
    MessageDraftsView.prototype.uiProperties = {
        pager: {
            pageSizes: [],
            backCount: 1,
            forwardCount: 1
        }

    };

    /**
     * Vue相关配置
     * @return {Object}
     */
    MessageDraftsView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
            },
            methods: {
                getMessageJobDraftInfo: function (id) {
                    me.get('actionPanel').url = '/message/add';
                    me.get('actionPanel').reload({id: id});
                }
            }
        };
    };


    /**
     * @inheritDoc
     */
    MessageDraftsView.prototype.uiEvents = {
        'pager:pagechange': function (e) {
            console.log('pagechange');
            this.forwardToPage(e);
        },
        'pager:pagesizechange': function (e) {
            console.log('pagesizechange');
            this.forwardToPage(e);
        },
        'addMsgBtn:click': function (e) {
            //可传参数到reload
            this.get('actionPanel').url = '/message/add';
            this.get('actionPanel').reload();
        }
    };

    MessageDraftsView.prototype.forwardToPage = function (e) {
        var pager = this.get('pager');
        var page = e.target.get('page');
        var pageSize = e.target.get('pageSize');
        if(!pager.isDisabled()){
            this.fire('pageSizeChange', {page: page, pageSize: pageSize});
        }
    };
    /**
     * 根据Model数据重新渲染页面
     */
    MessageDraftsView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };


    /**
     * 根据Model数据重新渲染列表
     */
    MessageDraftsView.prototype.refreshList = function (page) {
        this.vue.draftsPager = page;
    };
    require('er/util').inherits(MessageDraftsView, BaseView);
    return MessageDraftsView;
});
