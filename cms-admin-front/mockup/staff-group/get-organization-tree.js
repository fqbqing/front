/**
 * Created by Administrator on 2016/3/9 0009.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
            id: "1",
            name: "技术部",
            parent_id: "0",
            path: "1",
            valid_status: "0",
            created_time: "1460086348",
            updated_time: "1460086348",
            modified_by: "super_1",
            created_by: "super_1",
            children: [
                {
                    id: "2",
                    name: "前端组",
                    parent_id: "1",
                    path: "1_2",
                    valid_status: "0",
                    created_time: "1460430373",
                    updated_time: "1460430373",
                    modified_by: "super_1",
                    created_by: "super_1",
                    children: [
                        {
                            id: "4",
                            name: "一组",
                            parent_id: "2",
                            path: "1_2_4",
                            valid_status: "0",
                            created_time: "1460430428",
                            updated_time: "1460430428",
                            modified_by: "super_1",
                            created_by: "super_1"
                        },
                        {
                            id: "5",
                            name: "2组",
                            parent_id: "2",
                            path: "1_2_5",
                            valid_status: "0",
                            created_time: "1460430550",
                            updated_time: "1460430550",
                            modified_by: "super_1",
                            created_by: "super_1"
                        }
                    ]
                },
                {
                    id: "3",
                    name: "后端组",
                    parent_id: "1",
                    path: "1_3",
                    valid_status: "0",
                    created_time: "1460430380",
                    updated_time: "1460430380",
                    modified_by: "super_1",
                    created_by: "super_1"
                }
            ]
        }

    );

};