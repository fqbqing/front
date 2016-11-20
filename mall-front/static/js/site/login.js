/**
 * Created by lifayu on 15/12/2.
 */

(function ($) {

    var CODE_INTERVAL = 60;
    var wait = 0;

    function init() {
        $('#loginform').on('submit', function (e) {
            //var $form = $(this);
            //if ($form.data('enable')) {
            //    return true;
            //}
            e.preventDefault();
            check().then(function (data) {
                //$form.data('enable', true);
                submit(data);
            }, function (els) {
                $.each(els, function (i, el) {
                    el.closest('.form-group').addClass('field-error');
                });
            });
            return false;
        });

        $('#sendCodeBtn').on('click', function () {
            var btn = $(this);
            sendCode().then(function () {
                btn.prop('disabled', true);
                $('#verifyCode').prop('disabled', false);
                wait = CODE_INTERVAL;
                waitCode();
            }, function (message) {
                layer.tips(message, btn[0], {
                    tips: 1
                });
            });
        });
        $('.input').on('focus', function () {
            $(this).closest('.form-group').removeClass('field-error');
        });

        $('.agreement').on('click', function (e) {
            if (!env.os.phone) {
                top.layer.open({
                    type: 2, //此处以iframe举例
                    title: '叭叭买车用户注册协议', //'当你选择该窗体时，即会在最顶端',
                    area: ['600px', '500px'],
                    shade: 0.6,
                    offset: [
                        ($(top).height() - 500) / 2,
                        ($(top).width() - 600) / 2
                    ],
                    content: '/site/agreement?boxonly',
                    btn: ['关闭'],
                    zIndex: top.layer.zIndex, //重点1
                    success: function (layero) {
                        top.layer.setTop(layero); //重点2
                    }
                });
            }
            else {
                window.open('/site/agreement');
            }
            e.preventDefault();
        });
    }

    function waitCode() {
        var btn = $('#sendCodeBtn');
        wait -= 1;
        if (wait > 0) {
            btn.html(wait + '秒后重新发送');
            setTimeout(function () {
                waitCode();
            }, 1000);
        }
        else {
            btn.prop('disabled', false);
            btn.html('重新发送');
        }
    }

    /**
     * 发送验证码
     * @return {Deferred}
     */
    function sendCode() {
        var deferred = $.Deferred();
        //setTimeout(function(){
        //    deferred.resolve();
        //},1000);
        //return deferred.promise();
        var $phone = $('#phone');
        var phone = $.trim($phone.val());
        if (phone.length === 0) {
            deferred.reject('请先输入手机号');
        }
        else if (!/^\d{11}$/.test(phone)) {
            deferred.reject('手机号格式不正确');
        }
        else {
            $.post('/sms/send-verification-code', {
                mobile: phone
            }).then(function () {
                deferred.resolve();
            }, function () {
                deferred.reject('发送验证码失败,请稍后重试');
            });
        }
        return deferred.promise();
    }

    /**
     * 检查表单有效性
     * @return {Deferred}
     */
    function check() {
        var deferred = $.Deferred();
        var $phone = $('#phone');
        var $code = $('#verifyCode');
        var phone = $.trim($phone.val());
        var code = $.trim($code.val());
        var errors = [];
        if (!/^\d{11}$/.test(phone)) {
            errors.push($phone);
        }
        if ($code.is(':enabled') && !/^\d{6}$/.test(code)) {
            errors.push($code);
        }
        if (errors.length === 0) {
            deferred.resolve({
                phone: phone,
                verifyCode: code
            });
        }
        else {
            deferred.reject(errors);
        }
        return deferred.promise();
    }

    /**
     * 确认登录
     * @param {Object} data 登录信息
     */
    function submit(data) {
        //$('#loginform').submit();
        //data._csrf = $('meta[name=_csrf]').attr('content');
       /* var url = '/site/login?phone='+data.phone+'&verifyCode='+data.verifyCode;*/
        $.ajax({
            url: '/site/login',
            type: 'POST',
            dataType: 'json',
            data: data
        }).then(function (json) {
            if (json.success) {
                var url = $('input[name=url]').val() || '/site/index';
                top.location.href = url;
            }
            else {
                if (typeof json.message === 'string') {
                    top.layer.alert(json.message, {icon: 2});
                }
                else {
                    var msg = [];
                    for (var col in json.message) {
                        msg.push(json.message[col]);
                    }
                    top.layer.alert(msg.join(';'), {icon: 2});
                }
            }
        }, function (error) {
            top.layer.alert('发送请求失败,请稍后重试', {icon: 2});
        });
    }


    $(function () {
        init();
    });
})(window.jQuery);