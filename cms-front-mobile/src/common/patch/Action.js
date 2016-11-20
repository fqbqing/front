/**
 * Created by lifayu on 15/1/4.
 */
define(function (require) {

    var u = require('underscore');
    var $ = require('frozen');
    var Resolver = require('saber-promise');
    var Presenter = require('saber-mm/Presenter');

    var ActionView = require('./ActionView');

    /**
     * 展示一个能回调的页面
     * @param options
     *  - url 子页面地址
     *  - query 子页面需要的参数
     *  - title 页面标题
     * @return {Promise}
     */
    Presenter.prototype.startActivityForResult = function (options) {
        var tpl = [
            '<div class="activity-result-view-wrap">',
            '   <div class="activity-result-view-content">',
            '       <h2>' + (options.title || '') + '<span class="activity-result-view-close">&times;</span></h2>',
            '       <div class="activity-result-view"></div>',
            '   </div>',
            '</div>'
        ];
        var el = $(tpl.join(''));
        el.appendTo($('body'));
        //var htmlOverflow = $('html').css('overflow');
        //var bodyOverflow = $('body').css('overflow');
        //$('html').css('overflow', 'hidden');
        //$('body').css('overflow', 'hidden');
        var vm = new ActionView({
            el: el.find('.activity-result-view')[0],
            propsData: options
            //data: function () {
            //    return options;
            //}
        });

        el.find('.activity-result-view-close').on('click', function () {
            el.find('.activity-result-view-content').removeClass('active');
            setTimeout(function () {
                vm.$emit('cancel');
                vm.$destroy(true);
            }, 500);
        });

        function always() {
            //$('html').css('overflow', htmlOverflow);
            //$('body').css('overflow', bodyOverflow);
            el.remove();
        }

        var defererd = new Resolver();
        vm.$on('finish', function (result) {
            $(this.$el).closest('.activity-result-view-content').removeClass('active');
            defererd.resolve(result);
            always();
        });
        vm.$on('complete', function () {
            $(this.$el).closest('.activity-result-view-content').addClass('active');
        });
        vm.$on('cancel', function () {
            defererd.reject('cancel');
            always();
        });
        vm.$on('error', function () {
            defererd.reject('error');
            always();
        });
        return defererd.promise();
    };
});
