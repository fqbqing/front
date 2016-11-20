/**
 * Created by baba on 16/4/11.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.list(
        [
            {
                id: "5",
                payee: "nana",
                created_time: "1460442010",
                refund_time: "1460519830",
                account: '13265019973'
            },
            {
                id: "6",
                payee: "haha",
                created_time: "1460442010",
                refund_time: "1460519830",
                account: '13265019973'
            }
        ]
    );
};
