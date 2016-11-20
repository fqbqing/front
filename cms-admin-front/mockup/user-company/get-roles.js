var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        user: {"3": "另一个角色", "4": "还有一个角色"},
        group: {"3": "另一个角色1", "4": "还有一个角色1"}
    });

};