/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./info.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var constants = require('common/constants');
    var utils = require('common/utils');
    require('ui-vue/EditableContent');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MyInfoView() {
        BaseView.apply(this, arguments);
    }

    MyInfoView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    MyInfoView.prototype.template = 'TPL_my_info';

    /**
     * @inheritDoc
     */
    MyInfoView.prototype.uiProperties = {

    };

    MyInfoView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
            },
            ready: function () {
                var vue = this;
                this.$refs.uploadimage.uploader.on('uploadComplete', function (e) {
                    me.fire('updateAvatar',{
                        avatar: vue.$refs.uploadimage.src
                    });
                });
            }

        };
    };

    /**
     * @inheritDoc
     */
    MyInfoView.prototype.uiEvents = {};

    require('er/util').inherits(MyInfoView, BaseView);
    return MyInfoView;
});
