/**
 * Created by lifayu on 16/7/8.
 */
define(function (require) {

    return {
        actions: {
            /**
             * 将数据添加到列表中
             * @param {VueStore} store
             * @param {Array} list 待添加的数据
             * @param {boolean} freshed 是否是全新添加
             */
            addListviewItems: function (store, list, freshed) {
                store.dispatch('ADD_LISTVIEW_ITEMS', list, freshed);
            },
            /**
             * 清空列表
             * @param {VueStore} store
             */
            clearListview: function (store) {
                store.dispatch('CLEAR_LISTVIEW');
                store.dispatch('CHANGE_LISTVIEW_PAGE', {});
            },
            /**
             * 更新分页信息
             * @param {VueStore} store
             * @param {Object} page 分页信息
             */
            changeListviewPage: function (store, page) {
                store.dispatch('CHANGE_LISTVIEW_PAGE', page);
            }
        },
        state: {
            data: [],
            page: {
                pageNo: 1,
                pageSize: 15,
                totalCount: 0
            }
        },
        mutations: {
            CLEAR_LISTVIEW: function (state) {
                state.data = [];
            },
            ADD_LISTVIEW_ITEMS: function (state, list, freshed) {
                if (freshed) {
                    state.data = list;
                }
                else {
                    state.data = state.data.concat(list);
                }
            },
            CHANGE_LISTVIEW_PAGE: function (state, page) {
                state.page = {
                    pageNo: page.pageNo || 1,
                    pageSize: page.pageSize || 15,
                    totalCount: page.totalCount || 0
                };
            }
        }
    };
});