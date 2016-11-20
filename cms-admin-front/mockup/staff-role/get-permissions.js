var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        user: {
            activity: ['add', 'info', 'list']
        },
        group: {
            good: ['info', 'list']
        }
    });

};