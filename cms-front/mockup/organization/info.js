var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        {
            "id":"4",
            "phone":"01062682938",
            "group_id":"36",
            "extra":"",
            "valid_status":"0",
            "created_time":"1456820338",
            "updated_time":"1457961715",
            "modified_by":"admin_63",
            "created_by":"admin_24",
            "sale_group_id":"38",
            "market_group_id":"39",
            "show_public_customers":"1",
            "address":"",
            "group":{
                "id":"36",
                "name":"测试修",
                "parent_id":"0",
                "path":"36",
                "valid_status":"0",
                "created_time":"1456820338",
                "updated_time":"1456820338",
                "modified_by":"admin_24",
                "created_by":"admin_24",
                "organization_id":"36",
                "organization_name":"测试修"
            }
        }
    );
};
