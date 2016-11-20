/**
 * Created by baba on 16/4/22.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        [
            {
                deal_model: "车型一",
                count: 0
            },
            {
                deal_model: "车型二",
                count: 0
            }
        ]
    );

};
