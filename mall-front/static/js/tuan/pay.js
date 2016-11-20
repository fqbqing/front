(function ($, win) {
    var BBNS = win.BBNS;

    var USER = GLOBAL['USER'];
    Vue.config.delimiters = ['${', '}'];
    $.ajaxSettings.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
    };

    function showTips(msg, delay) {
        $.tips({
            content: msg,
            stayTime: delay || 2000,
            type: 'warn'
        });
    }

    var mv = new Vue({
        el: 'body',
        data: {
            paytype: ''
        },
        methods: {
            pay: function () {
                var orderId = BBNS.id;
                if (this.paytype.length === 0) {
                    showTips('请选择支付方式');
                }
                else if (this.paytype === 'weixin') {
                    window.open('/tuan/weixin-pay/?orderId=' + orderId);
                }
                else if (this.paytype === 'alipay') {
                    var url = '/iframe.php?u=' + encodeURIComponent('/tuan/ali-pay?orderId=' + orderId)
                        + '&title=支付宝支付';
                    window.open(url);
                }
            }
        }
    });
})(Zepto, window);