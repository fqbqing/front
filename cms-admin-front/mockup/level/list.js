/**
 * Created by baba on 16/4/16.
 */

var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list([
        {
            id: "5",
            name: "test",
            desc: "",
            valid_status: "0",
            created_time: "1460534396",
            updated_time: "1460534396",
            modified_by: "super_1",
            created_by: "super_1"
        },
        {
            id: "2",
            name: "试用版",
            desc: "",
            valid_status: "0",
            created_time: "1459248838",
            updated_time: "1459248838",
            modified_by: "admin_24",
            created_by: "admin_24"
        },
        {
            id: "3",
            name: "会员版",
            desc: "",
            valid_status: "0",
            created_time: "1459248838",
            updated_time: "1459248838",
            modified_by: "admin_24",
            created_by: "admin_24"
        },
        {
            id: "1",
            name: "体验版",
            desc: "",
            valid_status: "0",
            created_time: "1459248833",
            updated_time: "1459248833",
            modified_by: "admin_24",
            created_by: "admin_24"
        }
    ]);

};