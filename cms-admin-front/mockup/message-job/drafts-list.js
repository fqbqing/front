/**
 * Created by baba on 16/4/16.
 */

var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list([
        {
            id: "1",
            title: '草稿一',
            created_time: '1459248838',
            updated_time: "1459248838"
        },
        {
            id: "2",
            title: '草稿二',
            created_time: '1459248838',
            updated_time: "1459248838"
        },
        {
            id: "3",
            title: '草稿三',
            created_time: '1459248838',
            updated_time: "1459248838"
        },
        {
            id: "4",
            title: '草稿四',
            created_time: '1459248838',
            updated_time: "1459248838"
        }

    ]);

};