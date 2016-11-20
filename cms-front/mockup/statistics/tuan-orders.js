/**
 * Created by baba on 16/4/22.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
            tuan_id: "56",
            claimed_count: 1,
            today_claimed_count: 1,
            signup_count: 1,
            today_signup_count: 1,
            paid_count: 0,
            today_paid_count: 0,
            used_count: 0,
            today_used_count: 0,
            apply_refund_count: 0,
            today_apply_refund_count: 0,
            refunding_count: 0,
            today_refunding_count: 0,
            refunded_count: 0,
            today_refunded_count: 0,
            unclaimed_count: 3,
            today_unclaimed_count: 1
        }
    );

};