/**
 * Created by lifayu on 16/2/23.
 */
define(function (require) {

    var Vue = require('vue');
    var u = require('underscore');

    var crypt = require('crypt');
    var Storage = require('saber-storage');

    // 隐私模式下localStorage被禁用了，使用内存缓存代替
    var hardStorage = Storage('local') || Storage();
    var softStorage = Storage();

    var loadMoreTpl = [
        '<div class="ui-loading-wrap" v-if="needPager && listData.length">',
        '   <div class="action" v-show="!loading">',
        '       <button type="button" @click="loadMore" v-if="hasMore">点击加载更多</button>',
        '       <div class="no-more-content" v-if="!hasMore">没有更多了</div>',
        '   </div>',
        '   <div class="loading" v-show="loading">',
        '       <p><i class="ui-loading"></i> 加载中</p>',
        '   </div>',
        '</div>'
    ];

    var ListView = Vue.extend({
        replace: true,
        props: ['api', 'pageNo', 'pageSize', 'extraData', 'cacheType'],
        template: '<div><slot></slot></div>' + loadMoreTpl.join(''),
        data: function () {
            return {
                needPager: false,
                listData: [],
                params: {},
                loading: false,
                hasMore: false
            };
        },
        methods: {
            load: function (query) {
                if (typeof this.api !== 'function') {
                    return;
                }
                var me = this;
                var param = u.extend(me.params, query);
                me.loading = true;
                return me.api(param, {
                    loading: false
                }).then(function (page) {
                    var data = page || [];
                    if (me.needPager) {
                        me.$dispatch('renderListViewPage', this, {
                            pageNo: page.pageNo,
                            pageSize: page.pageSize,
                            totalCount: page.totalCount
                        });
                        me.hasMore = page && page.pageNo < page.totalCount / page.pageSize;
                        data = page.data;
                    }
                    else {
                        me.$dispatch('renderListViewPage', this, {
                            totalCount: data.length
                        });
                    }
                    me.listData.splice(0);
                    me.$dispatch('prepareListViewData', this, data);
                    u.each(data, function (item) {
                        me.listData.push(item);
                    });
                }).always(function () {
                    me.loading = false;
                });
            },
            loadMore: function () {
                if (typeof this.api !== 'function') {
                    return;
                }
                var me = this;
                var param = me.params;
                param.pageNo++;
                me.loading = true;
                return me.api(param).then(function (page) {
                    me.$dispatch('renderListViewPage', this, {
                        pageNo: page.pageNo,
                        pageSize: page.pageSize,
                        totalCount: page.totalCount
                    });
                    me.hasMore = page && page.pageNo < page.totalCount / page.pageSize;
                    me.$dispatch('prepareListViewData', this, page.data);
                    u.each(page.data, function (item) {
                        me.listData.push(item);
                    });
                }).always(function () {
                    me.loading = false;
                });
            },
            refresh: function () {
                if (this.needPager) {
                    this.pageNo = 1;
                    this.params.pageNo = 1;
                }
                this.load();
            },
            filter: function (query) {
                if (this.needPager) {
                    this.pageNo = 1;
                    this.params = u.extend(this.params, {
                        pageNo: 1,
                        pageSize: this.pageSize
                    });
                }
                this.listData.splice(0);
                this.load(query);
            }
        },
        watch: {
            'listData': function (data, oldData) {
                // 将新数据存储到缓存中
                this.myStorage.setItem(this.storageKey, data);
            }
        },
        ready: function () {
            if (!this.api) {
                return;
            }
            if (this.cacheType === 'mem') {
                this.myStorage = softStorage;
            }
            else {
                this.myStorage = hardStorage;
            }
            // 如果有pageSize就暂时认为是需要分页
            this.needPager = this.pageSize && this.pageSize > 0;
            this.extraData = this.extraData || {};
            this.params = u.extend(this.params, this.extraData);
            if (this.needPager) {
                this.params.pageNo = this.pageNo;
                this.params.pageSize = this.pageSize;
            }
            // 从缓存读取数据
            try {
                var key = this.storageKey = 'ListView_' + this.api.url + '_' + crypt.md5(JSON.stringify(this.params));
                this.listData = this.myStorage.getItem(key) || [];
            }
            catch (e) {}
            this.load();
            this.$dispatch('renderListView', this, this.listData);
        },
        destroyed: function () {

        }
    });

    Vue.component('listview', ListView);

    return ListView;
});