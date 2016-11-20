var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        city: '北京市',
        code: '110000',
        id: 1,
        name: '北京市',
        type: 4
    });
};
