/**
 * Created by Administrator on 2016/3/28 0028.
 */
(function ($) {
    Vue.component('weixin-favorite', {
        replace: true,
        template:'<div>'+
                        '<div class="favorite" @click="isFavorite = !isFavorite"><slot></slot></div>'+
                        '<div class="favorite-box" v-show="isFavorite" @click="isFavorite = !isFavorite" v-cloak></div>'+
                  '</div>',
        props: {
        },
        data: function () {
            return {
                isFavorite: false
            }
        },
        methods: {

        }
    });
})(Zepto);