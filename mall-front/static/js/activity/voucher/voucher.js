/**
 * 优惠券
 *
 * @param {string} activityId 活动ID
 * @param {string} voucherId 优惠券ID
 * @constructor
 */
function Voucher(activityId, voucherId) {
    this.activityId = activityId;
    this.voucherId = voucherId;
}

Voucher.prototype = {
    /**
     * 领取优惠券
     */
    claim: function () {
        var deffered = $.Deferred();

        $.ajax({
            url: '/activity/voucher/claim',
            type: 'POST',
            dataType: 'json',
            data: {
                activityId: this.activityId,
                id: this.voucherId
            }
        }).then(function (json) {
            if (json.success) {
                deffered.resolve(json.data.order_id);
            }
            else {
                deffered.reject(json.message);
            }
        }, function () {
            deffered.reject('发送网络请求失败，请稍后重试！');
        });

        return deffered.promise();
    },
    /**
     * 支付优惠券
     */
    pay: function () {
        var deffered = $.Deferred();

        $.ajax({
            url: '/activity/voucher/pay',
            type: 'POST',
            dataType: 'json',
            data: {
                activityId: this.activityId,
                id: this.voucherId
            }
        }).then(function (json) {
            if (json.success) {
                deffered.resolve(json.data.url);
            }
            else {
                deffered.reject(json.message);
            }
        }, function () {
            deffered.reject('发送网络请求失败，请稍后重试！');
        });

        return deffered.promise();
    },
    /**
     * 优惠券退款
     * @param {string} orderId 订单ID
     */
    refund: function (orderId) {
        var deffered = $.Deferred();

        $.ajax({
            url: '/activity/voucher/refund',
            type: 'POST',
            dataType: 'json',
            data: {
                orderId: orderId
            }
        }).then(function (json) {
            if (json.success) {
                deffered.resolve();
            }
            else {
                deffered.reject(json.message);
            }
        }, function () {
            deffered.reject('发送网络请求失败，请稍后重试！');
        });

        return deffered.promise();
    }
};

// 订单状态
//const SUCCESS      = 1; //领取成功
//const NOT_PAY      = 2; //未支付
//const PAY_FAILED   = 3; //支付失败
//const APPLY_REFUND = 4; //用户申请退款
//const USED         = 5; //已使用
