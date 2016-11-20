/**
 * Created by baba on 16/7/5.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [
            {
                "id": "7",
                "agent_id": "10",
                "agent_award_id": "5",
                "customer_id": "40",
                "activity_id": "115",
                "activity_type": "2",
                "stage": "1",
                "award_type": "1",
                "amount": "1000",
                "voucher_id": "0",
                "status": "2",
                "message": "",
                "agent_voucher_order_id": "0",
                "organization_id": "36",
                "valid_status": "0",
                "created_time": "1469175923",
                "updated_time": "1469176914",
                "created_by": "mall_10",
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
                "voucher": null,
                "activity": {
                    "id": "115",
                    "name": "经纪人推广活动回归",
                    "start_time": "1469174711",
                    "end_time": "1469261111",
                    "share_image_url": "",
                    "status": "1",
                    "extra": "{\"image\":\"\\/uploadFiles\\/20160722_1469174589209997.jpg\",\"share_image\":\"\\/uploadFiles\\/20160722_1469174598173207.jpg\",\"beautify_number\":\"10\",\"signup_start_time\":null,\"signup_end_time\":\"1470038460\",\"activity_time\":\"1469952060\"}",
                    "organization_id": "36",
                    "valid_status": "0",
                    "created_time": "1469174711",
                    "updated_time": "1469182729",
                    "created_by": "admin_63",
                    "modified_by": "admin_63",
                    "type": "2",
                    "page_info": "{\"theme\":\"steady\",\"global\":{\"price\":\"现场公布价格\",\"organization_name\":\"北京知春路XXX4S店\",\"address\":\"真的在知春路\",\"buytips\":\"温馨提示：现场订车用户请携身份证和订金（现金或刷卡皆可）以便现场办理订车手续\"},\"items\":[{\"type\":\"ARTICLE\",\"data\":{\"title\":\"这里是标题\",\"content\":\"这里填写正文\"}}]}",
                    "option": "[{\"name\":\"性别\",\"value\":\"女\\n男\",\"type\":\"radio\",\"required\":true},{\"name\":\"购车方式\",\"value\":\"全款\\n贷款\\n都行\",\"type\":\"checkbox\",\"required\":true}]",
                    "agent_spread": "1"
                },
                "customer": {
                    "id": "40",
                    "organization_id": "36",
                    "name": "李永超测试",
                    "phone": "17605365626",
                    "gender": null,
                    "channel": "20012",
                    "rating": "H",
                    "updated_time": "1458108744",
                    "created_time": "1458097287",
                    "valid_status": "0",
                    "modified_by": "admin_24",
                    "created_by": "mall_10",
                    "user_company_id": "0",
                    "user_id": "0",
                    "identification": ""
                }
            }
        ]
    );

};