/**
 * Created by lifayu on 16/6/14.
 */
$(function () {
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
    $('#signin').on('click', function () {
        var $el = $(this);
        var signupId = $(this).attr('data-signupid');
        $.ajax({
            url: '/activity/sign-in',
            type: 'POST',
            dataType: 'json',
            data: {
                signupId: signupId
            }
        }).then(function (json) {
            if (json.success) {
                showTips('签到成功');
                $el.closest('.order-info').addClass('order-signined');
                $el.closest('.item-content').remove(); // .html('<i class="signined">已签到</i>');
            }
            else {
                showTips(json.message);
            }
        }, function () {
            showTips('发送网络请求失败，请稍后重试');
        });
    });
});