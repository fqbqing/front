/**
 * Created by baba on 16/4/22.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
            total_num: "139",
            today_add_num: "1",
            today_track_num: "1"
        }
    );

};
