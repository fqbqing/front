var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.session(
        {
            name: '访问者',
            roleId: 1,
            id: 123,
            auth: {
                "user-group": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true},
                "staff-role": {
                    "update-data-permissions": true,
                    "update-permissions": true,
                    "add": true, "update": true, "delete": true, "all": true, "list": true, "info": true
                },
                "staff": {
                    "add": true, "update": true, "delete": true, "all": true, "list": true, "info": true
                },
                "staff-group": {
                    "add": true, "update": true, "delete": true, "all": true, "list": true, "info": true
                }
            },
            group: {
                address: "知春路",
                created_by: "admin_24",
                created_time: "1456820338",
                extra: "",
                group_id: "36",
                id: "4",
                market_group_id: "39",
                modified_by: "admin_63",
                phone: "01062682938",
                sale_group_id: "38",
                show_public_customers: "1",
                updated_time: "1458015171",
                valid_status: "0"
             }
        }
    );

    // return mockup.globalFail('无法读取用户信息！');

};
