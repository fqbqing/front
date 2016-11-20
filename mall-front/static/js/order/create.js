/**
 * Created by lifayu on 15/12/2.
 */

(function ($) {
    function init() {
        $('#order-submit').click(function(){
            /*未填写完*/
            check().then(function (data) {
                $('#orderForm').submit();
            }, function (els) {
                layer.alert('请填写购车人与手机号！');
            });
            return false;
        })
    }
    $(function () {
        init();
    });

    /**
     * 检查表单有效性
     * @return {Deferred}
     */
    function check() {
        var deferred = $.Deferred();
        var $phone = $('#userPhone');
        var $username = $('#userName');
        var phone = $.trim($phone.val());
        var username = $.trim($username.val());
        var errors = [];
        if (!/^\d{11}$/.test(phone)) {
            errors.push($phone);
        }
        if (username =='' && username == undefined) {
            errors.push($username);
        }
        if (errors.length === 0) {
            deferred.resolve({
                phone: phone,
                username: username
            });
        }
        else {
            deferred.reject(errors);
        }
        return deferred.promise();
    }
   /* function submit(data) {
        var productId = $('#productId').val();
        var activityId =  $('#activityId').val();
        var username = $("#username").val();
        var phone = $("#phone").val();
        var data = {
            productId:productId,
            activityId:activityId
        };
        $.ajax({
            url: '/order/check-stock',
            type: 'POST',
            dataType: 'json',
            data:data
        }).then(function (json) {
            if(json.success){
                /!*有库存，去生成订单*!/
                location.href='/order/create?productId='+productId+'&activityId='+activityId+'&userName='+username+'&userPhone='+phone;
            }else{
                /!*没库存，弹出提示信息*!/
                layer.alert(json.message);
            }
        }, function (error) {
        });
    }*/
})(window.jQuery);