/**
 * Created by Administrator on 2015/12/25 0025.
 */

(function () {
    var $qrcode = $('#qrcode');
    var cn = $qrcode.attr('data-cn');
    var chedamaiHost = 'chedamai.babamaiche.com';
    if (location.host === 'malltest.babamaiche.com') {
        chedamaiHost = 'chedamaitest.babamaiche.com';
    }
    var cnUrl = 'http://' + chedamaiHost + '/tuan/order/check?cn=' + cn;
    //$qrcode.find('img').attr('src','/tuan/qrcode?text='+encodeURIComponent('chedamai_order://'+cn));
    $qrcode.find('img').attr('src','/tuan/qrcode?text='+encodeURIComponent(cnUrl));

    var $boxLayout = $('.box-layout');
    var $box = $('.box');
    var $refundbtn = $('.refundbtn');
    var $cancel = $('.cancel');
    var $ok = $('.ok');

    $refundbtn.click(function(){
        if($(this).attr('data-status') == 2 || $(this).attr('data-status') == 6){
            boxToggle();
        }
    });
    $cancel.click(function(){
        boxToggle();
    });
    $ok.click(function(){
        var orderId = $('#orderId').val();
        location.href = '/tuan/refund?orderId=' + orderId;
    });

    var $caption = $('.explain .caption');
    $caption.click(function(){
        $('.ensured').toggle();
    });

    function boxToggle(){
        $boxLayout.toggle();
        $box.toggle();
    }

    $('.favorite').click(function(){
        $('.favorite-box').toggle();
    });
    $('.favorite-box').click(function(){
        $(this).toggle();
    });
})();