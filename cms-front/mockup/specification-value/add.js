var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        id: Math.floor(Math.random() * 1000)
    });

};