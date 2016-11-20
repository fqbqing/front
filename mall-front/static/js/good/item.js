/**
 * Created by lifayu on 15/12/4.
 */

var itemPage = new (function () {
    var me = this;

    me.selectedProduct = null;

    me.init = function (page) {
        me.createSpecification(page.info[0]);
        var $body = $('body');
        $body.scrollspy({
            target: '#navbar-part'
        });
        var navbarPart = $('#navbar-part');
        navbarPart.find('.spy li a').on('click', function () {
            var target = $(this).data('target');
            var $target = $(target);
            $('body,html').animate({
                scrollTop: $target.offset().top
            }, 300);
        });
        navbarPart.affix({
            offset: {
                top: function (el) {
                    var me = this;
                    setTimeout(function () {
                        var ref = navbarPart.prev('div');
                        me.top = ref.offset().top + ref.outerHeight();
                    }, 1000);
                    return (this.top = el.offset().top);
                },
                bottom: 0
            }
        });

        $('.buybtn').on('click', function() {
            var isGuest = GLOBAL.USER.isGuest;
            var pid = me.selectedProduct.id;
            if(isGuest){
                /*未登录,弹出登录框*/
                /* layer.alert("未登录，请登录",{title:'登录'});*/
                //window.location.href='/site/login?url=' + encodeURI(window.location.href);
                GLOBAL.showLoginDialog(window.location.href);
            }
            else{
                /*已登录，检验库存*/
                $.ajax({
                    url: '/order/check-stock',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        productId: pid,
                        activityId: 1
                    }
                }).then(function (json) {
                    if(json.success){
                        /*有库存，去填写订单页面*/
                        location.href='/order/create?productId=' + pid + '&activityId=1';
                    }else{
                        /*没库存，弹出提示信息*/
                        layer.alert(json.message);
                    }
                }, function (error) {
                    layer.alert('检查库存失败,请稍后重试!');
                });
            }
        });

        var $bigImage = $('#img-show');
        var width = $('.item-wrap').width();
        var widthPerItem = width / 4;
        var $thumbs = $('.thumb .item');
        var thumbCount = $thumbs.size();
        $thumbs.width(widthPerItem);
        var thumbIndex = 0;
        var activeIndex = 0;
        function setPositionOf(idx) {
            var left = widthPerItem * idx * -1;
            $('.thumb .item-wrap ul').css({
                marginLeft: left
            });
        }
        function activeThumb(idx) {
            var item = $('.thumb li').eq(idx);
            $bigImage.attr('src', item.find('img').attr('src'));
            item.addClass('active').siblings().removeClass('active');
        }
        setPositionOf(thumbIndex);
        activeThumb(activeIndex);

        $('.thumb').on('click', '.pager-prev', function () {
            if (thumbIndex > 0) {
                thumbIndex--;
                setPositionOf(thumbIndex);
            }
            if (activeIndex > 0) {
                activeIndex--;
                activeThumb(activeIndex);
            }
        }).on('click', '.pager-next', function () {
            if (thumbIndex + 4 < thumbCount) {
                thumbIndex++;
                setPositionOf(thumbIndex);
            }
            if (activeIndex < thumbCount - 1) {
                activeIndex++;
                activeThumb(activeIndex);
            }
        });
        $(window).on('resize.thumb', function () {
            widthPerItem = $('.item-wrap').width() / 4;
            $thumbs.width(widthPerItem);
            setPositionOf(thumbIndex);
        });
        $thumbs.on('click', function () {
            activeIndex = $(this).index();
            activeThumb(activeIndex);
        });
    };

    me.createSpecification = function (good) {
        var htm = [];
        var specifications = good.specifications;
        var specificationValues = good.specificationValues;
        // 规格id与values对应表
        var specificationMap = {};
        var metaMap = {};
        $.each(specificationValues, function (i, item) {
            if (specificationMap[item.specification_id]) {
                specificationMap[item.specification_id].push(item);
            }
            else {
                specificationMap[item.specification_id] = [item];
            }
            metaMap[item.id] = item;
        });

        var productsMap = {};
        $.each(good.products, function (i, item) {
            productsMap[item.id] = item;
        });

        //$('.specification').html(htm.join(''));

        function renderMeta(tree, path, disabled, checked) {
            if (typeof tree === 'object') {
                var htm = [];
                var idx = 0;
                var tmp = {};
                var specId = -1;
                var newPath = path;
                for (var id in tree) {
                    var meta = metaMap[id];
                    specId = meta.specification_id;
                    var pathString = path ? path + '_' + id : id;
                    htm.push('<label class="meta');
                    if (checked || idx === 0) {
                        htm.push(' meta-active');
                    }
                    htm.push('"><input name="meta_item_' + specId + '" data-path="' + pathString + '"');
                    if (disabled) {
                        htm.push(' disabled');
                    }
                    if (checked || idx === 0) {
                        htm.push(' checked');
                    }
                    htm.push(' value="' + id + '" type="radio">' + meta.name + '</label>');
                    if (idx === 0) {
                        newPath = pathString;
                        tmp = tree[id];
                    }
                    idx++;
                }
                $('#meta_' + specId).html(htm.join(''));
                renderMeta(tmp, newPath, false, idx === 1);
            }
            else {
                var product = productsMap[tree];
                $('#stock').text(product.stock);
                $('#price').text(product.amount / 1000000);
                $('#discount').text((good.market_price - product.amount) / 1000000);
                me.selectedProduct = product;
            }
        }

        renderMeta(good.svTree, '');

        $('.specification').on('change', '.meta input', function () {
            var $this = $(this);
            $this.closest('.meta').addClass('meta-active').siblings().removeClass('meta-active');
            var path = $this.attr('data-path').split('_');
            var tree = good.svTree;
            $.each(path, function (i, item) {
                tree = tree[item];
            });
            var size = 0;
            for (var id in tree) {
                size++;
            }
            renderMeta(tree, path.join('_'), false, size === 1);
        });
    };
})();
