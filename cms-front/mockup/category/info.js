var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok(
        {
            "id": "1",
            "name": "小型车",
            "brief": "小型车",
            "image_id": "7",
            "parent_id": "0",
            "created_time": "1449819740",
            "path": "1",
            "image": {
                "id": "7",
                "usage": "0",
                "extension": "jpg",
                "signature": "50becdafda1f41c2f6a409909bffd32f"
            },
            "category_img_path": "/uploadFiles/50becdafda1f41c2f6a409909bffd32f.jpg"
        }
    );

};