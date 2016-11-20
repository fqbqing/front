/**
 * Created by baba on 16/4/22.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        [
            {
                count: "4",
                signup_channel: "20011",
                signupChannel: {
                    id: "20011",
                    related_id: "0",
                    name: "测试4S店1",
                    type: "2",
                    valid_status: "0",
                    created_time: "1456820338",
                    updated_time: "1457434719",
                    modified_by: "mall-console_anonymous",
                    created_by: "admin_24",
                    organization_id: "36"
                }
            }
        ]
    );

};
