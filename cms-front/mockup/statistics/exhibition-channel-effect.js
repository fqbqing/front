
/**
 * Created by baba on 16/4/7.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        [
            {
                "count":"4",
                "channel":"20120",
                "signupChannel":{
                    "id":"20120",
                    "related_id":"0",
                    "name":"测试车展4s店",
                    "type":"2",
                    "valid_status":"0",
                    "created_time":"1459851062",
                    "updated_time":"1459851062",
                    "modified_by":"admin_24",
                    "created_by":"admin_24",
                    "organization_id":"198"
                }
            },
            {
                "count":"2",
                "channel":"20119",
                "signupChannel":{
                    "id":"20119",
                    "related_id":"0",
                    "name":"尚格",
                    "type":"3",
                    "valid_status":"0",
                    "created_time":"1459421100",
                    "updated_time":"1459421100",
                    "modified_by":"admin_24",
                    "created_by":"admin_24",
                    "organization_id":"1"
                }
            },
            {
                "count":"1",
                "channel":"20122",
                "signupChannel":{
                    "id":"20122",
                    "related_id":"165",
                    "name":"刘士云测试车展",
                    "type":"1",
                    "valid_status":"0",
                    "created_time":"1459851213",
                    "updated_time":"1459851213",
                    "modified_by":"admin_164",
                    "created_by":"admin_164",
                    "organization_id":"198"
                }
            },
            {
                "count":"1",
                "channel":"20121",
                "signupChannel":{
                    "id":"20121",
                    "related_id":"164",
                    "name":"杨博淋测试",
                    "type":"2",
                    "valid_status":"0",
                    "created_time":"1459851062",
                    "updated_time":"1459851062",
                    "modified_by":"admin_24",
                    "created_by":"admin_24",
                    "organization_id":"198"
                }
            },
            {
                "count":"1",
                "channel":"20016",
                "signupChannel":{
                    "id":"20016",
                    "related_id":"75",
                    "name":"刘士云",
                    "type":"1",
                    "valid_status":"0",
                    "created_time":"1456823784",
                    "updated_time":"1457434719",
                    "modified_by":"mall-console_anonymous",
                    "created_by":"admin_24",
                    "organization_id":"36"
                }
            }
        ]


    );

};
