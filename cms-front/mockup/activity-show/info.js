var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        id: "1",
        activity_id: "1",
        type: "1",
        url: "www.google.com",
        order: "2",
        updated_time: "1451470572",
        created_time: "2222",
        valid_status: "0",
        modified_by: "admin_27",
        activity: {
            id: "1",
            name: "普通售卖",
            brief: "普通售卖",
            image_default_id: "11",
            name_strategy: {},
            price_strategy: [{"target":"price", "operator":"multiply", "param" : 1, "newField":"amount"},{"target":"price", "operator":"replace", "param" : 1, "newField":"deposit"}],
            process_strategy: {},
            updated_time: "1449900911",
            created_time: "1449900911",
            valid_status: "0",
            modified_by: "system"
        },
        image_url: "/uploadFiles/ce54c9541615d6cfe8221d9205d55894.jpg"
    });

};