var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [{
            id: "1",
            name: "管理员",
            created_time: '1450256752'
        },{
            id: "2",
            name: "销售",
            created_time: '1450256752'
        }]
    );

};