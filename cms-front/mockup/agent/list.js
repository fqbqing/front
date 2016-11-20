var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [
            {
                "id": "8",
                "agent_id": "10",
                "phone": "18511695665",
                "organization_id": "36",
                "user_company_id": "68",
                "status": "1",
                "channel": "ssLfPevIQW19uPvS",
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
                },
                "owner": {
                    "id": "68",
                    "username": "yangbolin",
                    "user_info_id": null,
                    "phone1": "13366237821",
                    "phone2": null,
                    "name": "杨博林",
                    "group_id": "45",
                    "valid_status": "0",
                    "password": "202cb962ac59075b964b07152d234b70",
                    "passwd_modified": "1",
                    "access_token": null,
                    "auth_key": "LXYL7tBAWesku3ePPtcY0O8cPM_36jZV",
                    "created_time": "1456820874",
                    "updated_time": "1467185188",
                    "modified_by": "admin_68",
                    "created_by": "admin_24",
                    "in_charge": "1",
                    "title": "销售主管",
                    "avatar": ""
                },
                "total_income": 1000
            }
        ]
    );

};