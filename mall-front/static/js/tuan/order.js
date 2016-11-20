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

    function refund() {
        var dia = $.dialog({
            content: '确定要退款吗？',
            button: ['确认', '取消']
        });

        dia.on('dialog:action', function (e) {
            if (e.index === 0) {
                var $load = $.loading({
                    content: '退款中'
                });
                $.ajax({
                    url:'/tuan/refund',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        orderId: BBNS.order_id
                    }
                }).then(function (json) {
                    if (json.success) {
                        showTips('提交退款申请成功');
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    }
                    else {
                        showTips(json.message);
                    }
                }, function () {
                    showTips('发送请求失败，请稍后重试');
                }).always(function () {
                    $load.loading('hide');
                });
            }
        });
        dia.on('dialog:hide', function (e) {
        });
    }

    var mv = new Vue({
        el: 'body',
        methods: {
            refund: refund
        }
    });
})(Zepto, window);