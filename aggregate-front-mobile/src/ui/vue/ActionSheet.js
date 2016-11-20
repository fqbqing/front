/**
 * Created by lifayu on 16/2/23.
 */
define(function (require) {

    var Vue = require('vue');

    var tpl = [
        '<div class="ui-actionsheet" :class="{show:show}">',
        '   <div class="ui-actionsheet-cnt">',
        '       <h4 v-if="title" v-text="title"></h4>',
        '       <button v-for="item in actions" @click="selectItem(item)"',
        '           :class="{\'ui-actionsheet-del\':item.danger}">{{item.text}}</button>',
        '       <button @click="hideActionSheet">取消</button>',
        '   </div>',
        '</div>'
    ];

    var ActionSheet = {
        replace: true,
        props: ['name', 'title', 'actions', 'hasDelete', 'show'],
        template: tpl.join(''),
        methods: {
            showActionSheet: function () {
                this.show = true;
            },
            hideActionSheet: function () {
                this.show = false;
            },
            selectItem: function (item) {
                this.show = false;
                this.$dispatch('actionsheetselected', this, item);
            }
        },
        ready: function () {

        },
        destroyed: function () {

        }
    };

    Vue.component('actionsheet', ActionSheet);

    return ActionSheet;
});