/**
 * Created by lifayu on 15/12/19.
 */

(function ($) {

    var timer = null;
    var defaults = {
        duration: 3000
    };

    function Carousel(el, options) {
        this.options = $.extend(defaults, options);
        this.el = $(el);
        this.index = -1;

        var $list = this.el.find('.carousel-list');
        this.$list = $list;
        this.count = $list.find('>li').size();
        this.createHandler();
        this.next(false);
        this.start();

        var me = this;
        this.el.on('mouseenter', function () {
            me.pause();
        }).on('mouseleave', function () {
            me.start();
        });
    }

    Carousel.prototype.createHandler = function () {
        var me = this;
        var indicators = [];
        indicators.push('<ul class="carousel-indicators">');
        for (var i = 0; i < me.count; i++) {
            indicators.push('<li data-idx="' + i + '">' + i + '</li>');
        }
        indicators.push('</ul>');
        this.el.append(indicators.join(''));

        this.el.on('click', '.carousel-indicators li', function () {
            var idx = parseInt($(this).attr('data-idx'), 10);
            me.active(idx);
        });

        var controls = [
            '<a href="javascript:void(0);" class="carousel-control carousel-control-prev icon-angle-left"></a>',
            '<a href="javascript:void(0);" class="carousel-control carousel-control-next icon-angle-right"></a>'
        ];
        this.el.append(controls.join(''));

        this.el.on('click', '.carousel-control-prev', function () {
            me.prev(true);
        });
        this.el.on('click', '.carousel-control-next', function () {
            me.next(true);
        });
    };

    Carousel.prototype.start = function () {
        var me = this;
        timer = setInterval(function () {
            me.next(true);
        }, me.options.duration)
    };

    Carousel.prototype.next = function (animated) {
        var me = this;

        this.index = (++this.index % this.count);
        if (animated) {
            var prev = me.$list.find('.active').addClass('slideOutRight animated');
            var cur = me.$list.find('li').eq(this.index).addClass('active slideInLeft animated');

            setTimeout(function () {
                prev.removeClass('active slideOutRight animated');
                cur.removeClass('slideInLeft animated');
            }, 1000);
        }
        else {
            me.$list.find('.active').removeClass('active');
            me.$list.find('li').eq(this.index).addClass('active');
        }
        me.resetIndicator();
    };

    Carousel.prototype.prev = function (animated) {
        var me = this;

        this.index = ((--this.index + this.count) % this.count);
        if (animated) {
            var prev = me.$list.find('.active').addClass('slideOutLeft animated');
            var cur = me.$list.find('li').eq(this.index).addClass('active slideInRight animated');

            setTimeout(function () {
                prev.removeClass('active slideOutLeft animated');
                cur.removeClass('slideInRight animated');
            }, 1000);
        }
        else {
            me.$list.find('.active').removeClass('active');
            me.$list.find('li').eq(this.index).addClass('active');
        }
        me.resetIndicator();
    };

    Carousel.prototype.active = function (idx) {
        this.index = idx;
        this.$list.find('.active').removeClass('active');
        this.$list.find('li').eq(this.index).addClass('active');
        this.resetIndicator();
    };

    Carousel.prototype.resetIndicator = function () {
        var indicators = this.el.find('.carousel-indicators');
        indicators.find('.active').removeClass('active');
        indicators.find('li').eq(this.index).addClass('active');
    };

    Carousel.prototype.pause = function () {
        clearInterval(timer);
    };

    function showLoginDialog(url) {
        if ($(window).width() > 400) {
            layer.open({
                type: 2, //此处以iframe举例
                title: false, //'当你选择该窗体时，即会在最顶端',
                area: ['400px', '280px'],
                shade: 0.6,
                offset: [
                    ($(window).height() - 280) / 2,
                    ($(window).width() - 400) / 2
                ],
                content: '/site/login?boxonly&url=' + encodeURIComponent(url),
                //btn: ['继续弹出', '全部关闭'], //只是为了演示
                //yes: function () {
                //    $(that).click();
                //},
                //btn2: function () {
                //    layer.closeAll();
                //},
                zIndex: layer.zIndex, //重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                }
            });
        }
        else {
            window.location.href = '/site/login?url=' + encodeURIComponent(url);
        }
    }

    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
        }
    });

    // 展示登录页面
    GLOBAL.showLoginDialog = showLoginDialog;

    $(function () {
        var c = new Carousel($('[data-ui-type="carousel"]'));

        $('[data-original]').lazyload({
            //placeholder: __inline('../images/image-loading.png'),
            effect: "fadeIn"
        });

        $('[data-login]').on('click', function () {
            var url = $(this).attr('data-login') || '/';
            showLoginDialog(url);
        });
    });
})(jQuery);
