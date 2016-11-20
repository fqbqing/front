var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok([
        {
            id: 1,
            name: '北京'
        },
        {
            id: 2,
            name: '上海'
        },
        {
            id: 3,
            name: '武汉'
        }
    ]);
};
