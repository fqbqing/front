var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        "CustomerTrack": "客户跟踪",
        "Tuan": "团购活动",
        "UserCompany": "用户",
        "UserGroup": "用户分组"
    });

};