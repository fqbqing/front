/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var $ = require('jquery');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function MyInfo() {
        BaseAction.apply(this, arguments);
    }

    MyInfo.prototype.modelType = require('./InfoModel');
    MyInfo.prototype.viewType = require('./InfoView');

    function updateAvatar(e) {
        this.model.updateAvatar({
            avatar: e.avatar
        }).then(function () {
            $('.user-name img').attr('src',e.avatar);
        });
    }
    /**
     * @protected
     * @override
     */
    MyInfo.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updateAvatar', updateAvatar, this);
    };

    require('er/util').inherits(MyInfo, BaseAction);
    return MyInfo;
});
