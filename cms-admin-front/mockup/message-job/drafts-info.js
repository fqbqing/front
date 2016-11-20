/**
 * Created by lifayu on 16/4/13.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        id: "2",
        title: '草稿一',
        created_time: '1459248838',
        updated_time: "1459248838",
        content: 'XXXXXX',
        type: 1
    });

};