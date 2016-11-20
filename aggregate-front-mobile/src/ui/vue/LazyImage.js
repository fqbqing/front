/**
 * Created by lifayu on 16/2/23.
 */
define(function (require) {

    var Vue = require('vue');
    var $ = require('zepto/zepto.lazyload');

    var LazyImage = Vue.extend({
        replace: true,
        props: {
            src: {
                type: String,
                required: true
            },
            width: Number,
            height: Number,
            options: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        template: '<img :data-original="src" :width="width" :height="height"/>',
        data: function () {
            return {};
        },
        ready: function () {
            $(this.$el).lazyload(this.options);
        },
        destroyed: function () {
        }
    });

    Vue.component('lazy-image', LazyImage);

    return LazyImage;
});