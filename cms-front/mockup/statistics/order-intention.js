/**
 * Created by baba on 16/4/22.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        [
            {
                intention: "车型一",
                signup_order_count: 2,
                paid_order_count: 0,
                used_order_count: 0
            },
            {
                intention: "车型二",
                signup_order_count: 2,
                paid_order_count: 0,
                used_order_count: 0
            }
        ]


    );

};
