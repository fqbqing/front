/**
 * @file src/extension/track.js ~ 2014/08/04 12:19:28
 * @author leeight(liyubei@baidu.com)
 * er track，用来统计er应用的信息
 * https://github.com/ecomfe/er-track
 **/

define(function(require) {
    var u = require('underscore');

    function activate() {
        //var track = require('er-track').create();
        // 百度统计的帐号是bat-ria-stat，可以去这里查看相关的数据
        //track.use('baidu').setAccount('63ae7090cb07bd6548e0098dedb97bdc');
        //track.includeAll();
        //track.start();
    }

    return {
        activate: u.once(activate)
    };
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */
