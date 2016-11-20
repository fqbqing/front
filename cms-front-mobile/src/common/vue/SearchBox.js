/**
 * Created by lifayu on 16/2/23.
 */
define(function (require) {

    var Vue = require('vue');
    var u = require('underscore');

    var tpl = [
        '<div class="ui-searchbar-wrap focus ui-border-b">',
        '<div class="ui-searchbar ui-border-radius">',
        '   <i class="ui-icon-search" @click="search"></i>',
        '   <div class="ui-searchbar-input">',
        '   <input type="text" v-model="title" @keyup.enter="search" :placeholder="placeholder" autocapitalize="off">',
        '   </div>',
        '   <i class="ui-icon-close" v-show="title" @click="title=\'\'"></i>',
        '</div>',
        '</div>'
    ];
    var SearchBox = Vue.extend({
        replace: true,
        props: ['name', 'placeholder', 'title'],
        template: tpl.join(''),
        data: function () {
            return {
                //title: ''
            };
        },
        methods: {
            search: function () {
                this.$dispatch('search', this, this.title)
            }
        },
        ready: function () {
        },
        destroyed: function () {

        }
    });

    Vue.component('search-box', SearchBox);

    return SearchBox;
});