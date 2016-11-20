/**
 * Created by baba on 16/4/7.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        {
            tuan_count: '42',
            exhibition_count: '11'
        }
    );

};