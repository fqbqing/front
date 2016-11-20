/**
 * Created by lifayu on 16/7/8.
 */
define(function (require) {

    var exports = {};
    var u = require('underscore');

    function fetchModule(module) {
        return module.actions;
    }

    // 引入modules中定义的`actions`
    // actions需要**全局唯一**

    // 用户相关
    u.extend(exports, fetchModule(require('./modules/user')));
    u.extend(exports, fetchModule(require('./modules/activity')));
    u.extend(exports, fetchModule(require('./modules/award')));
    u.extend(exports, fetchModule(require('./modules/listview')));

    return exports;
});
