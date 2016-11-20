$(function () {
    var activityId = $('[name=activityId]').val();
    var voucherId = $('[name=voucherId]').val();
    var orderId = $('[name=orderId]').val();
    var voucher = new Voucher(activityId, voucherId);

    $('.btn-pay').on('click', function () {
        voucher.pay().then(function (payUrl) {
            window.location.href = payUrl;
        }, function (msg) {
            $.tips({
                content: msg,
                stayTime: 2000,
                type: 'error'
            });
        });
    });

    $('.btn-refund').on('click', function () {
        var dia=$.dialog({
            //title: '温馨提示',
            content: '你确定要申请退款吗？<br><small style="font-size: 10px;color: #666;">申请退款后将不能再领取该优惠券！</small>',
            button:['取消', '确认']
        });

        dia.on("dialog:action",function(e){
            if (e.index === 1) {
                voucher.refund(orderId).then(function () {
                    $.tips({
                        content: '退款申请已提交，正在处理中…',
                        stayTime: 2000,
                        type: 'info'
                    });
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                }, function (msg) {
                    $.tips({
                        content: msg,
                        stayTime: 2000,
                        type: 'error'
                    });
                });
            }
        });
        dia.on("dialog:hide",function(e){
        });
    });
});