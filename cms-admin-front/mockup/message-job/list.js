/**
 * Created by baba on 16/4/16.
 */

var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list([
        {
            id: "1",
            title: '公告一',
            created_time: '1459248838',
            updated_time: "1459248838"
        },
        {
            id: "2",
            title: '公告二',
            created_time: '1459248838',
            updated_time: "1459248838"
        },
        {
            id: "3",
            title: '公告三',
            created_time: '1459248838',
            updated_time: "1459248838"
        },
        {
            id: "4",
            title: '公告四',
            created_time: '1459248838',
            updated_time: "1459248838"
        }

    ]);

};