/**
 * Created by baba on 16/7/5.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [{
            "id": "3",
            "agent_id": "5",
            "amount": "500",
            "remark": "分批领取",
            "status": "3",
            "message": "123",
            "organization_id": "36",
            "valid_status": "0",
            "created_time": "1469172588",
            "updated_time": "1469177384",
            "created_by": "agent_5",
            "modified_by": "admin_63",
            "agent": {
                "id": "5",
                "username": "",
                "password": "",
                "passwd_modified": "0",
                "name": "珍梅",
                "phone": "13265019973",
                "open_id": "o5dojsxnUZp1NRznicsYcXzoDw8E",
                "user_detail": "",
                "access_token": "4-nNZrCp4iruFAaw7y5Bu_qwhkSbNt6S",
                "auth_key": "MEH1MTCcJsI2uOH3sLtG6_kWteSI0tOO",
                "valid_status": "0",
                "created_time": "1469170324",
                "updated_time": "1469432221",
                "created_by": "agent_anonymous",
                "modified_by": "agent_5"
            },
            "agentOrganization": {
                "id": "4",
                "agent_id": "5",
                "phone": "13265019973",
                "organization_id": "36",
                "user_company_id": "75",
                "status": "1",
                "channel": "20315",
                "valid_status": "0",
                "created_time": "1469170397",
                "updated_time": "1469170397",
                "created_by": "agent_5",
                "modified_by": "agent_5"
            }
        },
            {
                "id": "2",
                "agent_id": "1",
                "amount": "10",
                "remark": "能卖个啥呢~",
                "status": "2",
                "message": "",
                "organization_id": "36",
                "valid_status": "0",
                "created_time": "1469162187",
                "updated_time": "1469172516",
                "created_by": "agent_1",
                "modified_by": "admin_63",
                "agent": {
                    "id": "1",
                    "username": "",
                    "password": "",
                    "passwd_modified": "0",
                    "name": "lifayu",
                    "phone": "18611081833",
                    "open_id": "o5dojs-mUC-XQPZ_TSmqbLbi_i8s",
                    "user_detail": "",
                    "access_token": "X1ALcaNsDsJD7lq2vv4X3bnFtXDF0QrS",
                    "auth_key": "YI2Gv1HHGFyrER5NUodRu9mS--iJu5J2",
                    "valid_status": "0",
                    "created_time": "1469098493",
                    "updated_time": "1469099467",
                    "created_by": "agent_anonymous",
                    "modified_by": "agent_1"
                },
                "agentOrganization": {
                    "id": "1",
                    "agent_id": "1",
                    "phone": "18611081833",
                    "organization_id": "36",
                    "user_company_id": "75",
                    "status": "1",
                    "channel": "ssLfPevIQW19uPvS",
                    "valid_status": "0",
                    "created_time": "1469098493",
                    "updated_time": "1469160041",
                    "created_by": "agent_1",
                    "modified_by": "amin_63"
                }
            }]
    );

};
