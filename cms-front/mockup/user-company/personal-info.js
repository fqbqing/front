var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        id: "38",
        username: "zhangsan",
        user_info_id: null,
        phone1: "1861108****",
        phone2: null,
        name: "张三",
        group_id: "2",
        path: null,
        valid_status: "0",
        created_time: null,
        updated_time: "1453100244",
        modified_by: "admin_38",
        group: {
            id: "2",
            name: "技术部",
            parent_id: "1",
            path: "1_2",
            valid_status: "0",
            created_time: "1452760249",
            updated_time: "1452760249",
            modified_by: "admin_25"
        }
    });

};