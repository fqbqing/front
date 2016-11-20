/**
 * Created by lifayu on 15/12/4.
 */


var orderPage = new (function () {
    var me = this;
    function deleteOrder(orderId) {
        // TODO
        $.ajax({
            url: '/order/cancel',
            type: 'POST',
            dataType: 'json',
            data: {
                orderId: orderId
            }
        }).then(function (json) {
            if (json.success) {
                window.location.reload();
            }
            else {
                layer.alert(json.message, {icon: 2});
            }
        }, function () {
            layer.alert('发送请求失败,请稍后重试', {icon: 2});
        });
    }
    function refundOrder(orderId) {
        // TODO
        $.ajax({
            url: '/order/refund',
            type: 'POST',
            dataType: 'json',
            data: {
                orderId: orderId
            }
        }).then(function (json) {
            if (json.success) {
                window.location.reload();
            }
            else {
                layer.alert(json.message, {icon: 2});
            }
        }, function () {
            layer.alert('发送请求失败,请稍后重试', {icon: 2});
        });
    }

    me.init = function () {
        var id = $('#orderId').val();
        $('.deleteorder').on('click', function (e) {
            e.preventDefault();
            layer.confirm('确定要取消该订单吗?', {icon: 3, title:'提示'}, function(index){
                deleteOrder(id);
                layer.close(index);
            });
        });
        $('.refundbtn').on('click', function (e) {
            layer.confirm('确定要退款吗?', {icon: 3, title:'提示'}, function(index){
                refundOrder(id);
                layer.close(index);
            });
        });
    };
})();

$(function () {
    orderPage.init();
});