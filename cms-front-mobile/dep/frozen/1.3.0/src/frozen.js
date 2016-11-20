
define(function (require) {

    var $ = require('zepto');

    require('./core/core');

    require('./component/dialog');
    require('./component/loading');
    require('./component/tips');
    require('./component/scroll');

    return $;
});
