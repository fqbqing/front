var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        "id": 1,
        "name": "颜色",
        "display_type": 1,
        "updated_time": 1449819740,
        "created_time": 1449819740,
        "valid_status": 0,
        "modified_by": "system"
    });
};