/**
 * Created by lifayu on 16/5/28.
 */
define(function (require) {
    var $ = require('zepto');

    //全局配置
    var defaults = {
        showPageLoadingIndicator: true, //push.js加载页面的时候显示一个加载提示
        swipePanel: "left", //滑动打开侧栏
        swipePanelOnlyClose: true  //只允许滑动关闭，不允许滑动打开侧栏
    };

    $.smConfig = $.extend(defaults, $.config);

    require('./util');
    require('./zepto-adapter');
    require('./device');
    require('./modal');
    require('./searchbar');

    require('./tabs');
    require('./fixed-tab');

    require('./scroll-fix');
    require('./pull-to-refresh');
    require('./pull-to-refresh-js-scroll');
    require('./infinite-scroll');
    require('./scroller');

    require('./picker');
    require('./panels');

    var FaskClick = require('./fastclick');

    $(function() {
        FaskClick.attach(document.body);
    });

    return {};
});