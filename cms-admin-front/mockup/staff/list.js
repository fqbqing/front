/**
 * Created by baba on 16/4/11.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.list(
        [
            {
                id: "5",
                username: "",
                phone1: "18511695665",
                phone2: null,
                name: "刘士云",
                staff_group_id: "3",
                valid_status: "0",
                passwd_modified: "0",
                created_time: "1460442010",
                updated_time: "1460519830",
                modified_by: "super_1",
                created_by: "super_1",
                in_charge: "0",
                title: "研发工程师",
                staffGroup: {
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
            },
            {
                id: "3",
                username: "",
                phone1: "13265019973",
                phone2: null,
                name: "钟珍梅",
                staff_group_id: "2",
                valid_status: "0",
                passwd_modified: "0",
                created_time: "1460433178",
                updated_time: "1460433178",
                modified_by: "super_1",
                created_by: "super_1",
                in_charge: "0",
                title: "研发工程师",
                staffGroup: {
                    id: "2",
                    name: "前端组",
                    parent_id: "1",
                    path: "1_2",
                    valid_status: "0",
                    created_time: "1460430373",
                    updated_time: "1460430373",
                    modified_by: "super_1",
                    created_by: "super_1"
                }
            }
        ]
    );
};
