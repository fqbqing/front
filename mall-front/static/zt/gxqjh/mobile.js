var util = {};
util.isPhoneValidate = function (phone) {
    var phoneRegex = /^1[3|4|5|7|8]\d{9}$/;
    return phoneRegex.test(phone);
};

util.isIdCardValidate = function (num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num);
};

function showTips(msg) {
    // alert(msg);
    var $toast = $('<div class="toast"><span>' + msg + '</span></div>');
    $('body').append($toast);
    setTimeout(function () {
        $toast.remove();
    }, 2000);
}

function App() {
}

App.prototype.initBrand = function () {
    // 初始化预购品牌列表
    var brands = [];
    $.each(this.groupon.option, function (i, opt) {
        if (opt.name === '预购品牌') {
            brands = opt.value.split('\n');
            return false;
        }
    });
    var $brand = $('#brand');
    var htm = $.map(brands, function (item) {
        return '<option value="' + item + '">' + item + '</option>';
    });
    $brand.html(htm.join(''));
};

App.prototype.initTicket = function () {
    // $('#address').hide();
    // $('#idCard').hide();
    var paperOpt = $('.paper-ticket-opt').hide();
    $('[name=ticket]').on('change', function () {
        var type = this.value;
        if (type === 'e-ticket') {
            // $('#address').hide();
            // $('#idCard').hide();
            paperOpt.hide();
            $('#postage').val('在线支付').change();
        }
        else {
            // $('#address').show();
            // $('#idCard').show();
            paperOpt.show();
        }
    });

    $('#postage').on('change', function () {
        if (this.value === '在线支付') {
            $('#buy span').text('10元抢票');
        }
        else {
            $('#buy span').text('免费索票');
        }
    });

    $('.btn-try-signup').on('click', function () {
        $('body').addClass('signup-page')
    });


    new Swiper('.swiper-exhibition', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 20,
        slidesPerView: 1, //'auto',
        loop: true,
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true
    });
};

App.prototype.initVerifyCode = function () {
    var me = this;
    var $btn = $('#getVerifyCode');
    var $phone = $('#phone');

    var verifyCodeTime = 60;
    function reduceVerifyCodeTime() {
        verifyCodeTime = verifyCodeTime - 1;
        if (verifyCodeTime > 0) {
            $btn.text(verifyCodeTime + '秒后重发');
            setTimeout(function () {
                reduceVerifyCodeTime();
            }, 1000);
        }
        else {
            $btn.text('获取验证码');
            $btn.prop('disabled', false);
            verifyCodeTime = 60;
        }
    }

    function send(phone) {
        $btn.prop('disabled', true);
        $.post('/sms/send-verification-code', {
            mobile: phone
        }).then(function (data) {
            if(!data.success){
                showTips(json.message);
                return;
            }
            reduceVerifyCodeTime();
        }, function () {
            showTips('发送验证码失败,请稍后重试');
            $btn.prop('disabled', false);
        });
    }
    $btn.on('click', function () {
        var phone = $.trim($phone.val());
        if (util.isPhoneValidate(phone)) {
            send(phone);
        }
        else {
            me.showError({
                name: 'phone',
                msg: '手机号不合法'
            })
        }
    });
};

App.prototype.getSignupFormData = function () {
    var data = {};
    $('.signup-form select, .signup-form input').each(function () {
        data[this.name] = $.trim(this.value);
    });
    data.ticket = 'e-ticket'; //$('[name=ticket]:checked').val();
    return data;
};

App.prototype.validate = function (data) {
    var deferred = $.Deferred();
    var msg = '';
    var name = '';
    if (data.username.length == 0) {
        name = 'username';
        msg = '请输入姓名';
    }
    else if (!util.isPhoneValidate(data.phone)) {
        name = 'phone';
        msg = '手机号不合法';
    }
    else if (!/^\d{6}$/.test(data.verifyCode)) {
        name = 'verifyCode';
        msg = '验证码不正确';
    }
    else if (data.vehicle.length === 0) {
        name = 'vehicle';
        msg = '请填写预购车型';
    }
    else if (data.ticket === 'paper-ticket') {
        // if (!util.isIdCardValidate(data.idCard)) {
        //     name = 'idCard';
        //     msg = '身份证格式不正确';
        // }
        // if (data.address.length < 8) {
        //     name = 'address';
        //     msg = '请正确填写通信地址, 至少8位字符';
        // }
    }
    if (msg) {
        deferred.reject({
            name: name,
            msg: msg
        });
    }
    else {
        deferred.resolve();
    }
    return deferred.promise();
};

App.prototype.showError = function (item) {
    // var box = $('[name=' + item.name + ']').closest('.form-group');
    // box.find('.tip').remove();
    // box.append('<div class="tip">' + item.msg + '</div>');
    showTips(item.msg);
};

App.prototype.signup = function (data) {
    var me = this;
    var param = {
        id: me.groupon.id,
        phone: data.phone,
        name: data.username,
        verifyCode: data.verifyCode
    };
    param['预购品牌'] = data.brand;
    param['预购车型'] = data.vehicle;
    if (data.ticket === 'e-ticket') {
        param['票种'] = '电子票';
    }
    else {
        // param['身份证'] = data.idCard;
        // param['地址'] = data.address;
        param['票种'] = '纸质票';
        // param['邮费支付方式'] = data.postage;
    }
    $.ajax({
        url:'/activity/groupon/signup',
        type: 'post',
        dataType: 'json',
        data: param
    }).then(function (json) {
        if (json.success) {
            me.createPayment();
            /*
            if (data.postage === '在线支付') {
                me.createPayment();
            }
            else {
                window.location.href = '/activity/groupon/signup-detail?signupId=' + json.data.id;
            }
            */
        }
        else {
            showTips(json.message);
            me.checkSignupStatus();
        }
    }, function () {
        showTips('发送请求失败，请稍后重试');
    });
};

App.prototype.createPayment = function () {
    var me = this;
    $.ajax({
        url: '/activity/groupon/pay',
        type: 'POST',
        dataType: 'json',
        data: {
            id: me.groupon.id,
            intentionId: me.groupon.intention.id
        }
    }).then(function (json) {
        if (json.success) {
            window.location.href = json.data.url;
        }
        else {
            showTips(json.message);
        }
    }, function () {
        showTips('发送网络请求失败，请稍后重试！');
    });
};

/**
 * 检查一下用户是否已经报名该团购了，如果有订单，则直接进入订单页面
 */
App.prototype.checkSignupStatus = function () {
    var me = this;
    return $.ajax({
        url:'/activity/groupon/get-signup',
        type: 'get',
        dataType: 'json',
        data: {
            id: me.groupon.id
        }
    }).then(function (json) {
        if(json.success && json.data){
            window.location.href = '/activity/groupon/signup-detail?signupId=' + json.data.id;
            // window.location.reload();
        }
    });
};

App.prototype.init = function (option) {

    var me = this;
    this.groupon = option.groupon;
    this.initBrand();
    this.initTicket();
    this.initVerifyCode();

    $('#buy').on('click', function () {
        var data = me.getSignupFormData();
        me.validate(data).then(function () {
            me.signup(data);
        }, function (item) {
            me.showError(item);
        });
    });
};

var app = new App();
