/**
 * Created by baba on 16/4/22.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok([
            {
                date: "2016-04-16",
                data: {
                    customerCount: 0,
                    customerTrackCount: "0",
                    tuanOrderCount: "0",
                    exhibitionOrderCount: "0"
                }
            },
            {
                date: "2016-04-17",
                data: {
                    customerCount: 0,
                    customerTrackCount: "0",
                    tuanOrderCount: "0",
                    exhibitionOrderCount: "0"
                }
            },
            {
                date: "2016-04-18",
                data: {
                    customerCount: 1,
                    customerTrackCount: "0",
                    tuanOrderCount: "1",
                    exhibitionOrderCount: "0"
                }
            },
            {
                date: "2016-04-19",
                data: {
                    customerCount: 0,
                    customerTrackCount: "0",
                    tuanOrderCount: "0",
                    exhibitionOrderCount: "0"
                }
            },
            {
                date: "2016-04-20",
                data: {
                    customerCount: 0,
                    customerTrackCount: "0",
                    tuanOrderCount: "0",
                    exhibitionOrderCount: "0"
                }
            },
            {
                date: "2016-04-21",
                data: {
                    customerCount: 0,
                    customerTrackCount: "0",
                    tuanOrderCount: "0",
                    exhibitionOrderCount: "0"
                }
            },
            {
                date: "2016-04-22",
                data: {
                    customerCount: 0,
                    customerTrackCount: "0",
                    tuanOrderCount: "0",
                    exhibitionOrderCount: "0"
                }
            }
        ]
    );

};

