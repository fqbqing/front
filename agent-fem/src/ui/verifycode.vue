<template>
    <button type="button" :disabled="disabled" class="button button-light" @click="sendCode">{{text}}</button>
</template>
<script>
    var utils = require('utils');
    var $ = require('zepto');
    var api = require('config').api;
    var WAIT_TIME = 60;
    module.exports = {
        props: {
            phone: {
                type: String,
                required: true
            },
            isExist: {
                type: Boolean,
                default: function () {
                    return true;
                }
            }
        },
        data: function () {
            return {
                time: 0,
                disabled: false
            };
        },
        computed: {
            text: function () {
                return this.disabled ? this.time + '秒重发' : '获取验证码';
            }
        },
        methods: {
            sendCode: function () {
                var me = this;
                if (utils.isPhoneValidate(this.phone)) {
                    me.disabled = true;
                    function wait(time) {
                        var now = (new Date()).getTime();
                        me.time = WAIT_TIME - Math.ceil((now - time) / 1000);
                        if (me.time > 0) {
                            setTimeout(function () {
                                wait(time);
                            }, 1000);
                        }
                        else {
                            me.time = 0;
                            me.disabled = false;
                        }
                    }
                    api.sendVerifyCode({
                        mobile: this.phone
                    }).then(function (data) {
                        me.time = WAIT_TIME;
                        me.isExist = data.isExist;
                        var time = (new Date()).getTime();
                        setTimeout(function () {
                            wait(time);
                        }, 1000);
                    }, function () {
                        me.disabled = false;
                    });
                }
                else {
                    $.toast('手机号不合法');
                }
            }
        }
    };
</script>