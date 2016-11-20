/**
 * Created by lifayu on 16/2/23.
 */
define(function (require) {

    var Vue = require('vue');
    var u = require('underscore');
    var Swiper = require('swiper');

    var tpls = [
        '<div class="swiper-container">',
        '   <div class="swiper-wrapper"><slot></slot></div>',
        '   <div class="swiper-pagination swiper-pagination-white"></div>',
        '</div>'
    ];

    var SwiperView = {
        replace: true,
        props: {
            pagination: {
                type: Boolean,
                default: true
            },
            options: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            id: {
                type: String,
                default: function () {
                    return (new Date()).getTime();
                }
            }
        },
        template: tpls.join(''),
        ready: function () {
            var me = this;
            // 在手机上，不延时会出现拖动问题
            setTimeout(function () {
                me.swiper = new Swiper(me.$el, u.extend({
                    pagination: me.pagination ? '.swiper-pagination' : null,
                    slidesPerView: 1,
                    autoplay : 5000,
                    paginationClickable: true,
                    spaceBetween: 10,
                    loop: me.pagination
                }, me.options));
            }, 0);
        },
        destroyed: function () {
        }
    };

    Vue.component('swiper', SwiperView);

    return SwiperView;
});