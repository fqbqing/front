

function showTips(msg) {
    alert(msg);
}

function App() {
}

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

App.prototype.init = function (option) {

    var me = this;
    this.groupon = option.groupon;
    this.orderStatus = option.orderStatus;
    this.signup = option.signup;

    var signup = {};
    for (var i = 0; i < this.signup.length; i++) {
        var opt = this.signup[i];
        signup[opt.key] = opt.values.join(',');
    }
    if (this.orderStatus == 1) {
        if (signup['票种'] === '电子票') {
            $('.signup-tip-e').show();
        }
        else {
            $('.signup-tip-paper').show();
        }
    }
    // else if (signup['邮费支付方式'] === '到付') {
    //     $('.signup-tip-paper').show();
    //     $('.payinfo').hide();
    // }

    $('.paybtn').on('click', function () {
        me.createPayment();
    });
};

var app = new App();
