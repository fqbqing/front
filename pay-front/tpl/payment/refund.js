/**
 * Created by lifayu on 16/5/11.
 */

$(function () {

    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
        }
    });

    function getPayParams() {
        var args = {};
        args.refundId = $('[name=refundId]').val();
        args.paySign = $('[name=paySign]').val();
        return args;
    }
    function alipay() {

        YJ.loading.show('正在提交退款申请…');
        var args = getPayParams();
        var newTab = window.open('about:blank');
        return $.ajax({
            url: '/ali-pay/refund',
            type: 'POST',
            dataType: 'json',
            data: args
        }).then(function (json) {
            if (json.errorCode === 0) {
                newTab.location.href = json.data.url;
                return true;
            }
            else {
                newTab.close();
                YJ.layer.alert('提示信息', json.message);
            }
        }, function () {
            newTab.close();
            YJ.layer.alert('提示信息', '发送网络请求失败，请稍后重试！');
        }).always(function () {
            YJ.loading.hide();
        });
    }

    function wx() {

        YJ.loading.show('正在提交退款申请…');
        var args = getPayParams();
        return $.ajax({
            url: '/wx-pay/refund',
            type: 'POST',
            dataType: 'json',
            data: args
        }).then(function (json) {
            if (json.errorCode === 0) {
                // TODO 刷新状态
                YJ.layer.alert('提交退款申请成功，请稍后查询退款状态');
                return true;
            }
            else {
                YJ.layer.alert('提示信息', json.message);
            }
        }, function () {
            YJ.layer.alert('提示信息', '发送网络请求失败，请稍后重试！');
        }).always(function () {
            YJ.loading.hide();
        });
    }

    // 点击确认退款的事件处理
    $(document).on('click', '.refund-pay', function () {
        var $el = $(this);
        var type = $el.attr('data-type');

        YJ.layer.confirm('确定要进行退款操作吗？').then(function () {
            switch (type) {
                case 'wx':
                    wx().then(function (done) {
                        if (done) {
                            $el.closest('.tab-pane').addClass('refunded');
                        }
                    });
                    break;
                case 'alipay':
                    alipay().then(function (done) {
                        if (done) {
                            $el.closest('.tab-pane').addClass('refunding');
                        }
                    });
                    break;
            }
        });
    });

    // 点击`已完成退款申请`的事件处理
    $(document).on('click', '.btn-done', function () {
        //$(this).closest('.tab-pane').removeClass('refunding').addClass('refunded');
        window.location.reload();
    });
});