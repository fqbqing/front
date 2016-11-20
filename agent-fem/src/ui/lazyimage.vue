<template>
    <img :data-original="src" :width="width" :height="height"/>
</template>
<script>
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
        ready: function () {
            $(this.$el).lazyload(this.options);
        },
        destroyed: function () {
        }
    });
    module.exports = LazyImage;
</script>