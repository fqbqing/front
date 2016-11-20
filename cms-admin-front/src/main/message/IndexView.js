/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./index.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MessageIndexView() {
        BaseView.apply(this, arguments);
    }

    MessageIndexView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    MessageIndexView.prototype.template = 'TPL_message_index';

    /**
     * @inheritDoc
     */
    MessageIndexView.prototype.uiProperties = {
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
    MessageIndexView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {

            },
            methods: {
                getMessageJobInfo: function (id) {
                    me.get('actionPanel').url = '/message/detail';
                    me.get('actionPanel').reload({id: id});
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    MessageIndexView.prototype.uiEvents = {
        'pager:pagechange': function (e) {
            this.forwardToPage(e);
        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        },
        'addMsgBtn:click': function (e) {
            //可传参数到reload
            this.get('actionPanel').url = '/message/add';
            this.get('actionPanel').reload();
        }
    };

    MessageIndexView.prototype.forwardToPage = function (e) {
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
    MessageIndexView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };


    /**
     * 根据Model数据重新渲染列表
     */
    MessageIndexView.prototype.refreshList = function (page) {
        this.vue.noticePager = page;
    };

    require('er/util').inherits(MessageIndexView, BaseView);
    return MessageIndexView;
});
