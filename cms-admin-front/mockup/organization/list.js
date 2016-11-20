/**
 * Created by baba on 16/4/11.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.list(
        [
            //{
            //    "id":"4",
            //    "phone":"01062682938",
            //    "group_id":"36",
            //    "extra":"",
            //    "valid_status":"0",
            //    "created_time":"1456820338",
            //    "updated_time":"1457961715",
            //    "modified_by":"admin_63",
            //    "created_by":"admin_24",
            //    "sale_group_id":"38",
            //    "market_group_id":"39",
            //    "show_public_customers":"1",
            //    "address":"",
            //    "group":{
            //        "id":"36",
            //        "name":"测试修",
            //        "parent_id":"0",
            //        "path":"36",
            //        "valid_status":"0",
            //        "created_time":"1456820338",
            //        "updated_time":"1456820338",
            //        "modified_by":"admin_24",
            //        "created_by":"admin_24",
            //        "organization_id":"36",
            //        "organization_name":"测试修"
            //    }
            //},
            //{
            //    "id":"4",
            //    "phone":"01062682938",
            //    "group_id":"36",
            //    "extra":"",
            //    "valid_status":"0",
            //    "created_time":"1456820338",
            //    "updated_time":"1457961715",
            //    "modified_by":"admin_63",
            //    "created_by":"admin_24",
            //    "sale_group_id":"38",
            //    "market_group_id":"39",
            //    "show_public_customers":"1",
            //    "address":"",
            //    "group":{
            //        "id":"36",
            //        "name":"测试修",
            //        "parent_id":"0",
            //        "path":"36",
            //        "valid_status":"0",
            //        "created_time":"1456820338",
            //        "updated_time":"1456820338",
            //        "modified_by":"admin_24",
            //        "created_by":"admin_24",
            //        "organization_id":"36",
            //        "organization_name":"测试修"
            //    }
            //}

            {
                id: "58",
                phone: "289893903",
                group_id: "281",
                name: "test",
                extra: "",
                valid_status: "0",
                created_time: "1460187843",
                updated_time: "1460187843",
                modified_by: "admin_24",
                created_by: "admin_24",
                sale_group_id: "283",
                market_group_id: "284",
                show_public_customers: "1",
                address: "知春路",
                level_id: "3",
                level_expire_time: "0",
                logo_image_id: "0"
            },
            {
                id: "57",
                phone: "010-8888888",
                group_id: "277",
                name: "测试自动化创建4s店体验版",
                extra: "",
                valid_status: "0",
                created_time: "1460187669",
                updated_time: "1460187669",
                modified_by: "mall-console_anonymous",
                created_by: "mall-console_anonymous",
                sale_group_id: "279",
                market_group_id: "280",
                show_public_customers: "1",
                address: "北京知春路",
                level_id: "1",
                level_expire_time: "0",
                logo_image_id: "0"
            }
        ]
    );
};
