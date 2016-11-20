var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok([
        {
            "id": 1,
            "specification_id": 1,
            "name": "red",
            "extra": "#fff",
            "updated_time": 1450271776,
            "created_time": 2015,
            "valid_status": 0,
            "modified_by": "system"
        },
        {
            "id": 2,
            "specification_id": 1,
            "name": "black",
            "extra": "#000",
            "updated_time": 111,
            "created_time": 111,
            "valid_status": 0,
            "modified_by": "system"
        }
    ]);

};