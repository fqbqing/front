/**
 * Created by lifayu on 15/12/4.
 */


var orderPage = new (function () {

    var me = this;

    function pay(orderId) {
        me.layerIndex = layer.open({
            type: 2,
            title: '支付定金',
            area: ['500px', '400px'],
            fix: false, //不固定
            maxmin: false,
            content: '/mock/pay?id=' + orderId
        });
    }

    function deleteOrder(orderId) {
        // TODO
        $.ajax({
            url: '/site/delete',
            type: 'POST',
            dataType: 'json',
            data: {
                id: orderId
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
        $('.paybtn').on('click', function () {
            var id = $(this).closest('.panel').attr('data-order-id');
            pay(id);
        });

        $('.deleteorder').on('click', function (e) {
            e.preventDefault();
            var id = $(this).closest('.panel').attr('data-order-id');
            layer.confirm('确定要删除该订单吗?', {icon: 3, title:'提示'}, function(index){
                deleteOrder(id);
                layer.close(index);
            });
        });
    };
})();

$(function () {
    orderPage.init();
});

// 注册支付回调监听
window.onpaysuccess = function () {
    layer.close(orderPage.layerIndex);
    layer.msg('支付成功', {icon: 1}, function () {
        window.location.reload();
    });
};