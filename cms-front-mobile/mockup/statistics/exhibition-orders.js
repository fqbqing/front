/**
 * Created by baba on 16/4/7.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
            "exhibition_coupon_activity_id":"2",
            "claimed_count":2,
            "today_claimed_count":0,
            "receive_count":2,
            "today_receive_count":0,
            "singin_count":0,
            "today_signin_count":0,
            "done_count":0,
            "today_done_count":0,
            "unclaimed_count":7,
            "today_unclaimed_count":0
        }
    );

};