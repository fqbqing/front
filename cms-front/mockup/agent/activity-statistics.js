/**
 * Created by baba on 16/7/5.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [
            {
                "id": "118",
                "name": "东风日产厂价限时秒杀会",
                "start_time": "1469418948",
                "end_time": "1469505348",
                "share_image_url": "",
                "status": "1",
                "extra": "{\"image\":\"\\/uploadFiles\\/20160725_1469418865947158.jpg\",\"share_image\":\"\\/uploadFiles\\/20160725_1469418873385851.jpg\",\"beautify_number\":\"20\",\"signup_start_time\":null,\"signup_end_time\":\"1474602600\",\"activity_time\":\"1469418600\"}",
                "organization_id": "36",
                "valid_status": "0",
                "created_time": "1469418948",
                "updated_time": "1469516908",
                "created_by": "admin_63",
                "modified_by": "admin_63",
                "type": "2",
                "page_info": "{\"theme\":\"default\",\"global\":{\"price\":\"现场公布价格\",\"organization_name\":\"东风日产河西专营店\",\"address\":\"长沙市岳麓大道375号\",\"buytips\":\"温馨提示：现场订车用户请携身份证和订金（现金或刷卡皆可）以便现场办理订车手续\"},\"items\":[{\"type\":\"ARTICLE_GROUP\",\"data\":[{\"title\":\"全湖南省首次\",\"content\":\"厂家补贴限时秒杀会\"},{\"title\":\"200张油卡疯狂送\",\"content\":\"全车系超万元现金优惠\"}]},{\"type\":\"ARTICLE\",\"data\":{\"title\":\"即刻报名 获取活动底价\",\"content\":\"7-18到30号期间，提前预交100元到店现场即可领取100元油卡一张＋2000元车款现金抵用券\"}}]}",
                "option": "[{\"name\":\"意向车型\",\"value\":\"新轩逸\\n新蓝鸟\\n新逍客\\n轩逸经典\\n天籁\\n奇骏\\n楼兰\\n西马\",\"type\":\"checkbox\",\"required\":true}]",
                "agent_spread": "1",
                "agent_statistics": {
                    "signup_count": 0,
                    "deal_count": 0,
                    "agent_cost": 0
                }
            },
            {
                "id": "117",
                "name": "推广测试－奖励测试",
                "start_time": "1469179236",
                "end_time": "1469265636",
                "share_image_url": "",
                "status": "1",
                "extra": "{\"image\":\"\\/uploadFiles\\/20160722_1469179165748188.jpg\",\"share_image\":\"\\/uploadFiles\\/20160722_1469179172392131.jpg\",\"beautify_number\":\"20\",\"signup_start_time\":null,\"signup_end_time\":\"1469870280\",\"activity_time\":\"1469179080\"}",
                "organization_id": "36",
                "valid_status": "0",
                "created_time": "1469179236",
                "updated_time": "1469517030",
                "created_by": "admin_63",
                "modified_by": "admin_63",
                "type": "2",
                "page_info": "",
                "option": "",
                "agent_spread": "1",
                "agent_statistics": {
                    "signup_count": 0,
                    "deal_count": 0,
                    "agent_cost": 0
                }
            },
            {
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
                "agent_spread": "1",
                "agent_statistics": {
                    "signup_count": "1",
                    "deal_count": "0",
                    "agent_cost": "1000"
                }
            }
        ]
    );

};