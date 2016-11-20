/**
 * Created by lifayu on 16/3/3.
 */
define(function (require) {
    var ListView = require('./ListView');
    var ActionSheet = require('./ActionSheet');
    var SearchBox = require('./SearchBox');
    var LazyImage = require('./LazyImage');
    var SwiperView = require('./Swiper');

    return {
        ListView: ListView,
        ActionSheet: ActionSheet,
        SearchBox: SearchBox,
        LazyImage: LazyImage,
        SwiperView: SwiperView
    };
});