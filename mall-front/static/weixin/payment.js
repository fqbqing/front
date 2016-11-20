/**
 * Created by lifayu on 15/12/2.
 */

(function () {
    function init() {
        if(env.browser.ie){
            $('.payment-title span').append('<i>（推荐使用微信支付）</i>');
        }
        var orderId = $('#orderId').val();
        $('.payment-type .paymentbtn').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
          $('#payBtn').on('click', function(){
              var title = $('.payment-type .paymentbtn.active').attr('id');
              if(title == 'wechatpay'){
                  //PC微信
                  //openInNewWindow('/weixin-pay/pay/?orderId='+orderId, '微信支付')
                  window.open('/tuan/weixin-pay/?version=old&orderId=' + orderId);
              }
              else {
                  // 支付宝支付
               /*   window.open('/tuan/ali-pay?orderId=' + orderId);*/
                  // 以下方式需要进行判断,只在微信中才需要这样做
                  openInNewWindow('/tuan/ali-pay?orderId=' + orderId, '支付宝支付');
              }
          });
    }
    function openInNewWindow(url, title) {
        var url = '/iframe.php?u=' + encodeURIComponent(url) + '&title=' + title;
        window.open(url);
    }
   init();
})();