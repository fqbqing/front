/**
 * Created by Administrator on 2016/2/22 0022.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
        id: 2,
        user_id: 1,
        organization_id: 1,
        rating: "B",
        updated_time: 1456124023,
        created_time: 1456123921,
        valid_status: 0,
        modified_by: "admin_28",
        created_by: "admin_28"
        }
    );

};
