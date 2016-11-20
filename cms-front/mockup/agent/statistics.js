var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok(
        {
            "agent_count": 8,
            "signup_customer_count": 7,
            "deal_customer_count": 0,
            "agent_cost": 5001
        }
    );

};