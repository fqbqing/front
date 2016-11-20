<template>
    <div class="list-view">
        <div class="pull-to-refresh-layer">
            <div class="preloader"></div>
            <div class="pull-to-refresh-arrow"></div>
        </div>
        <!-- list -->
        <div>
            <slot></slot>
        </div>
        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader">
            <div class="preloader"></div>
        </div>
    </div>
</template>
<script>

    var actions = require('vuex/actions');
    var Vue = require('vue');
    var u = require('underscore');

    var $ = require('zepto');

    var ListView = {
        replace: true,
        props: {
            api: {
                type: Function,
                required: true
            },
            ptrContent: {
                type: String,
                required: true
            },
            query: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        vuex: {
            getters: {
                page: function (state) {
                    return state.listview.page;
                },
                listData: function (state) {
                    return state.listview.data;
                }
            },
            actions: actions
        },
        data: function () {
            return {
                loading: false
            };
        },
        computed: {
            enableInfinite: function () {
                return this.page.pageNo * this.page.pageSize < this.page.totalCount;
            }
        },
        methods: {
            disableInfiniteScroll: function () {
                var ptrContent = $(this.ptrContent);
                $(this.$el).find('.infinite-scroll-preloader').hide();
                $.detachInfiniteScroll(ptrContent);
            },
            enableInfiniteScroll: function () {
                var ptrContent = $(this.ptrContent);
                $(this.$el).find('.infinite-scroll-preloader').show();
                $.attachInfiniteScroll(ptrContent);
            },
            ptrRefresh: function () {
                var me = this;
                var param = u.extend(this.query, {
                    pageNo: 1,
                    pageSize: this.page.pageSize
                });

                return this.request(param).then(function (page) {
                    if (!me._isDestroyed) {
                        me.changeListviewPage(page);
                        me.addListviewItems(page.data, true);
                    }
                });
            },
            infiniteScroll: function () {
                var me = this;
                var param = u.extend(this.query, {
                    pageNo: this.page.pageNo + 1,
                    pageSize: this.page.pageSize
                });
                return this.request(param).then(function (page) {
                    if (!me._isDestroyed) {
                        me.changeListviewPage(page);
                        me.addListviewItems(page.data, false);
                    }
                });
            },
            request: function (param) {
                return this.api(param);
            },
            search: function (query) {
                this.query = query;
                this.ptrRefresh();
            }
        },
        watch: {
            enableInfinite: function (value) {
                if (value) {
                    this.enableInfiniteScroll();
                }
                else {
                    this.disableInfiniteScroll();
                }
            }
        },
        ready: function () {
            var me = this;
            var ptrContent = $(this.ptrContent);
            ptrContent.addClass('pull-to-refresh-content infinite-scroll infinite-scroll-bottom');

            $.initPullToRefresh(ptrContent);
            $.refreshScroller(ptrContent);
            // 添加'refresh'监听器
            ptrContent.on('refresh', function (e) {
                me.ptrRefresh().always(function () {
                    // 加载完毕需要重置
                    $.pullToRefreshDone(ptrContent);
                });
            });

            // 注册'infinite'事件处理函数
            ptrContent.on('infinite', function () {

                // 如果正在加载，则退出
                if (me.loading) return;

                // 设置flag
                me.loading = true;

                me.infiniteScroll().always(function () {
                    // 重置加载flag
                    me.loading = false;
                    //容器发生改变,如果是js滚动，需要刷新滚动
                    $.refreshScroller();
                });
            });
            var t = this.ptrRefresh();
            if (me.enableInfinite) {
                this.enableInfiniteScroll();
            }
            else {
                this.disableInfiniteScroll();
            }
        },
        destroyed: function () {
            var ptrContent = $(this.ptrContent);
            $.destroyPullToRefresh(ptrContent);
            $.detachInfiniteScroll(ptrContent);
            this.clearListview();
        }
    };
    module.exports = ListView;
</script>