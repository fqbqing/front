/**
 * Created by Administrator on 2015/12/25 0025.
 */

(function () {

    var $errorMsg = $('#errorMessage');
    var $buywaynav = $('.buyway .buyway-nav');
    var $maldenav = $('.model .model-nav');
    function init() {
        $maldenav.find('li').eq(0).addClass('active');
        $maldenav.find('li').click(function(){
            if( $maldenav.find('li.active').size() == 2){
                if($(this).hasClass('active')){
                    $(this).toggleClass('active');
                }else{
                    $errorMsg.html('最多选择两个车型').show();
                    setTimeout(function(){
                        $errorMsg.hide();
                    },2000);
                }
            }else{
                $(this).toggleClass('active');
            }
        });

        $buywaynav.find('li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.applybtn').on('click', function (e) {
            checkToSubmit();
        });
    }

    /**
     * 检查表单有效性并报名
     *
     */
    function checkToSubmit() {
        var $phone = $('#phone');
        var $name = $('#userName');
        var $boxLayout = $('.box-layout');
        var phone = $.trim($phone.val());
        var name =  $.trim($name.val());
        var tuanId = $('#tuanId').val();
        var buyway = $buywaynav.find('li.active').attr('data-buyway');

        var errMessage = [];
        var intention = [];

        $maldenav.find('li.active').each(function(){
            intention.push($(this).text());
        });
        if (intention.length === 0) {
            // error
            errMessage.push('请选择期望车型');
        }
        if (name.length === 0) {
            errMessage.push('请输入您的姓名');
        }
        if (phone.length === 0) {
            errMessage.push('请输入您的手机号');
        }
        else if (!/^\d{11}$/.test(phone)) {
            errMessage.push('请输入正确的手机号');
        }
        if (errMessage.length === 0) {
            var param = {
                phone: phone,
                name: name,
                intention: intention,
                tuanId: tuanId,
                carBuyingWay: buyway
            };
            $.ajax({
                url:'/tuan/sign-up',
                type: 'post',
                dataType: 'json',
                data:param
            }).then(function (json) {
                if (json.success) {
                    $('.closebtn').attr('href','/tuan/tuan-order-detail?orderId=' + json.data.orderId);
                    $('.ok').attr('href','/tuan/tuan-coupon-detail?orderId=' + json.data.orderId+'&type=1');
                    $('.data-title').html(json.data.title);
                    $('.data-content').html(json.data.content+',名额有限，先抢先得！');
                    $boxLayout.show();
                }
                else {
                    $errorMsg.html(json.message).show();
                    setTimeout(function(){
                        $errorMsg.hide();
                    }, 2000);
                }
            }, function (error) {
                $errorMsg.html('发送网络请求失败').show();
                setTimeout(function(){
                    $errorMsg.hide();
                },2000);
            });
        }
        else {
            $errorMsg.html(errMessage.join('<br>')).show();
            setTimeout(function(){
                $errorMsg.hide();
            },2000);
        }
    }
    init();
})();