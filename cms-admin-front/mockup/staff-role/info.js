var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        "id": 1,
        "name": "管理员",
        "updated_time": 1449819740,
        "created_time": 1449819740,
        "valid_status": 0,
        "modified_by": "system"
    });
};