var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [{
            id: "1",
            name: "时尚",
            created_time: '1450256752'
        },{
            id: "2",
            name: "品质",
            created_time: '1450256752'
        }]
    );

};