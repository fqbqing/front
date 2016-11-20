/**
 * Created by baba on 16/5/17.
 */
define(function () {
    var api = require('common/config').api;
    var $ = require('jquery');
    var moment = require('moment');
    var u = require('underscore');
    var message = {
        defalutOptions: {
            refresh: false
        },
        $messageCenter: $('#message-center'),
        $unreadCount: null,
        $messageDialog: null,
        $dialogCloseIcon: null,
        $checkLink: null,
        init: function (options) {
            var me = this;
            var mergeOptions = u.extend(me.defalutOptions, options);
            me.$unreadCount = $('<i class="ui-badge bb-main-color unread-count"></i>').appendTo(me.$messageCenter);
            me.render();
            if (mergeOptions.refresh) {
                //setInterval(me.render,5*60*1000);
            }
        },
        render: function () {
            var me = this;
            if(this.$messageDialog){
                this.dispose(this.$messageDialog);
            }
            api.messagePull({},{showLoading: false}).then(function (data) {
                if(data.unread_count > 0){
                    me.$unreadCount.show().text(data.unread_count);
                }else{
                    me.$unreadCount.hide();
                }
                if(data.count > 0){
                    var html_str = '<div class="ui-ctrl ui-dialog slideInUp message-dialog">'+
                        '<h1 data-role="title" class="ui-dialog-head ui-ctrl ui-panel">'+
                        '<div class="ui-dialog-title">您收到'+ data.count +'条新通知</div>'+
                        '<div class="ui-dialog-close-icon">&nbsp;</div>'+
                        '</h1>'+
                        '<div data-role="content" class="ui-dialog-body-panel ui-ctrl ui-panel">'+
                        '<div class="ui-dialog-body">'+
                        '<div class="dialog-content" style="text-align: center">'+
                        '<p>您有'+ data.count +'条新通知！</p>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="ui-dialog-foot-panel ui-ctrl ui-panel">'+
                        '<div class="ui-dialog-foot">'+
                        '<div class="ui-dialog-ok-btn ui-ctrl ui-button skin-spring skin-spring-button"><a href="javascript:void(0);" style="text-decoration: none;color: #fff;" class="check-link">立即查看</a></div>'+
                        '</div>'+
                        '</div>'+
                        '</div>';
                    me.$messageDialog = $(html_str).appendTo('body');
                    me.$dialogCloseIcon = me.$messageDialog.find('.ui-dialog-close-icon');
                    me.$checkLink = me.$messageDialog.find('.check-link');
                    me.initEvents();
                }
            });
        },
        dispose: function(el){
            el.remove();
        },
        initEvents: function () {
            var me = this;
            if (this.$dialogCloseIcon) {
                this.$dialogCloseIcon.on('click',function(){
                    me.dispose(me.$messageDialog);
                });
            }
            if (this.$checkLink) {
                this.$checkLink.on('click',function(){
                    me.dispose(me.$messageDialog);
                    location.href = '#/message/index~_='+moment().unix();
                });
            }

        }


    };

    return message;
});