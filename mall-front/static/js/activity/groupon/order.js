/**
 * 团购报名信息页面
 *
 * @author lifayu@babamaiche.com
 */
$(function () {

    var activityId = $('[name=activityId]').val();
    var intentionId = $('[name=intentionId]').val();
    var orderId = $('[name=orderId]').val();

    function showTip(msg) {
        $.tips({
            content: msg,
            stayTime: 2000,
            type: 'error'
        });
    }

    // 支付
    $('.paybtn').on('click', function () {
        $.ajax({
            url: '/activity/groupon/pay',
            type: 'POST',
            dataType: 'json',
            data: {
                id: activityId,
                intentionId: intentionId
            }
        }).then(function (json) {
            if (json.success) {
                window.location.href = json.data.url;
            }
            else {
                showTip(json.message);
            }
        }, function () {
            showTip('发送网络请求失败，请稍后重试！');
        });
    });

    // 退款
    $('.refundbtn').on('click', function () {
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
                    url: '/activity/groupon/refund',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        orderId: orderId
                    }
                }).then(function (json) {
                    if (json.success) {
                        showTip('提交退款申请成功');
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    }
                    else {
                        showTip(json.message);
                    }
                }, function () {
                    showTip('发送网络请求失败，请稍后重试！');
                }).always(function () {
                    $load.loading('hide');
                });
            }
        });
        dia.on('dialog:hide', function (e) {
        });
    });
});