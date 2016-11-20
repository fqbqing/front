/**
 * Created by lifayu on 16/5/13.
 */
(function () {

    $(function () {
        var swiperPager = $('.swiper-container-banner .swiper-pagination');
        var hasPage = swiperPager.length > 0;
        var swiper = new Swiper('.swiper-container-banner', {
            pagination: hasPage ? '.swiper-pagination' : null,
            slidesPerView: 1,
            autoplay : 5000,
            paginationClickable: true,
            spaceBetween: 10,
            loop: hasPage,
            autoResize: false,
            onInit: function (me) {
                if (hasPage) {
                    $('.swiper-container .swiper-button-next').on('click', function () {
                        me.swipeNext();
                    });
                    $('.swiper-container .swiper-button-prev').on('click', function () {
                        me.swipePrev();
                    });
                }
            }
        });
    });
})();