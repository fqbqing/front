/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./page.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    require('ui-vue/EditableContent');
    var u = require('underscore');

    var $ = require('jquery');
    require('jquery/jquery.slimscroll');

    require('jquery.cookie');

    var constants = require('common/constants');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GrouponPageView() {
        BaseView.apply(this, arguments);
    }

    GrouponPageView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GrouponPageView.prototype.template = 'TPL_groupon_page';

    /**
     * @inheritDoc
     */
    GrouponPageView.prototype.uiProperties = {

    };

    /**
     * 对多行文本进行过滤，去除空行和空格
     * @param {string} text
     * @return {string}
     */
    function trimwhitespace(text) {
        var ret = [];
        var array = text.split('\n');
        u.each(array, function (item) {
            var value = item.replace(/\s*/g, '');
            if (value.length) {
                ret.push(value);
            }
        });
        return ret.join('\n');
    }

    GrouponPageView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                themes: [{
                    name: 'default',
                    text: '科幻'
                },{
                    name: 'young',
                    text: '年轻'
                },{
                    name: 'freshness',
                    text: '清新'
                },{
                    name: 'steady',
                    text: '稳重'
                }]
            },
            events: {
                REMOVE_COMPONENT_ITEM: function (item) {
                    var idx = u.indexOf(this.pageInfo.items, item);
                    this.pageInfo.items.splice(idx, 1);
                },
                MOVE_TOP_COMPONENT_ITEM: function (item) {
                    var idx = u.indexOf(this.pageInfo.items, item);
                    if (idx === 0) {
                        this.$view.showToast('已经到顶了');
                        return;
                    }
                    this.pageInfo.items.splice(idx, 1);
                    this.$nextTick(function () {
                        this.pageInfo.items.splice(idx - 1, 0, item);
                    });
                },
                MOVE_BOTTOM_COMPONENT_ITEM: function (item) {
                    var idx = u.indexOf(this.pageInfo.items, item);
                    if (idx === this.pageInfo.items.length - 1) {
                        this.$view.showToast('已经到底了');
                        return;
                    }
                    this.pageInfo.items.splice(idx, 1);
                    this.$nextTick(function () {
                        this.pageInfo.items.splice(idx + 1, 0, item);
                    });
                },
                APPEND_COMPONENT_ITEM: function (item) {
                    var idx = u.indexOf(this.pageInfo.items, item);
                    //var copy = $.extend(true, {}, this.$view.model.compoments[item.type]);
                    var copy = $.extend(true, {}, item);
                    this.pageInfo.items.splice(idx + 1, 0, copy);
                }
            },
            methods: {
                addItem: function (type) {
                    this.pageInfo.items.push($.extend(true, {}, this.$view.model.compoments[type]));
                    this.$nextTick(function () {
                        var item = $('.items > div', this.$view.main).last();
                        var offset = item.offset();
                        var phone = $('.phone', this.$view.main);
                        var top = offset.top - phone.offset().top;
                        //phone.scrollTop(phone.scrollTop() + top);
                            phone.slimscroll({
                                scrollTo: phone.scrollTop() + top
                            });
                        item.find('.contenteditable-wrap:first').focus();
                    });
                },
                addSignupOption: function () {
                    this.signupOptions.push({
                        name: '',
                        value: '',
                        type: 'checkbox',
                        required: true
                    });
                },
                removeSignupOption: function (idx) {
                    this.signupOptions.splice(idx, 1);
                },
                save: function () {
                    var flag = false;
                    u.find(this.signupOptions, function (opt, i) {
                        opt.name = $.trim(opt.name);
                        opt.value = trimwhitespace(opt.value);
                        if ($.trim(opt.name) === '') {
                            me.waitAlert('第' + (i + 1) + '个报名项名称不能为空');
                            flag = true;
                            return false;
                        }
                        if (opt.type !== 'text' && opt.value.length === 0) {
                            me.waitAlert('第' + (i + 1) + '个报名项可选值不能为空');
                            flag = true;
                            return false;
                        }
                    });
                    if (flag) {
                        return;
                    }
                    me.fire('SAVE', {
                        pageInfo: this.pageInfo,
                        signupOptions: this.signupOptions
                    });
                },
                preview: function () {
                    var url = constants.C_URL + '/activity/groupon/' + this.id + '.html';
                    window.open(url);
                },
                changeTheme: function (theme) {
                    this.pageInfo.theme = theme.name;
                }
            },
            ready: function () {
            }
        };
    };

    /**
     * @inheritDoc
     */
    GrouponPageView.prototype.uiEvents = {};

    GrouponPageView.prototype.enterDocument = function () {
        BaseView.prototype.enterDocument.apply(this, arguments);
        $('.phone', this.main).slimscroll({
            height: 480,
            width: 320
        });
        setTimeout(function () {
            var gi = $.cookie(constants.cookie.grouponIntro);
            if (gi != '1') {
                require('jquery/intro')('.groupon-page').setOptions({
                    scrollView: document.querySelector('#main'),
                    nextLabel: '下一条&rarr;',
                    prevLabel: '&larr;上一条',
                    skipLabel: '跳过',
                    doneLabel: '完成',
                    exitOnOverlayClick: true
                }).start().oncomplete(function () {
                    $.cookie(constants.cookie.grouponIntro, '1', {
                        expires: 365,
                        path: '/'
                    });
                });
            }
        }, 500);
    };

    require('er/util').inherits(GrouponPageView, BaseView);
    return GrouponPageView;
});
