/**
 * Created by baba on 16/7/5.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [
            {
                "agent_id": "10",
                "total_income": "1000",
                "agentInfo": {
                    "id": "8",
                    "agent_id": "10",
                    "phone": "18511695665",
                    "organization_id": "36",
                    "user_company_id": "68",
                    "status": "1",
                    "channel": {
                        "id": "20330",
                        "related_id": "10",
                        "name": "刘经济",
                        "type": "4",
                        "code": "A3e0f73",
                        "valid_status": "0",
                        "created_time": "1469175758",
                        "updated_time": "1469175758",
                        "modified_by": "agent_anonymous",
                        "created_by": "agent_anonymous",
                        "organization_id": "0"
                    },
                    "valid_status": "0",
                    "created_time": "1469175758",
                    "updated_time": "1469524253",
                    "created_by": "agent_10",
                    "modified_by": "admin_63",
                    "agent": {
                        "id": "10",
                        "username": "",
                        "password": "",
                        "passwd_modified": "0",
                        "name": "刘经济",
                        "phone": "18511695665",
                        "open_id": "o5dojs1qrlKAcW717a7DiL7AMUm8",
                        "user_detail": "",
                        "access_token": "nE4MbAN5nODKrmvXpMqi2BAuHNVvdf-A",
                        "auth_key": "S8oCrQpMsdTI0PZDhkqI3G280lnHNlvD",
                        "valid_status": "0",
                        "created_time": "1469175758",
                        "updated_time": "1469177531",
                        "created_by": "agent_anonymous",
                        "modified_by": "agent_10"
                    }
                },
                "statistics": {
                    "channel": "20330",
                    "signup_count": "1",
                    "deal_count": "0"
                }
            }
        ]
    );

};
