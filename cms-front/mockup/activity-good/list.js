var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [{
            id: "1",
            type: '1',
            action: 2,
            good: {
                bn: "10003", //商品编号
                name: "奔驰aa最好的奔驰车aa最好的奔驰车aa最好的奔驰车aa最好的奔驰车aa最好的奔驰车aa",
                image_default_id: "12",
                brief: "最好的奔驰车aa",
                marketable: "true",  //是否上架
                order: "41", //展示权重
                low_price: "150000001",
                high_price: "550000001",
                market_price: "480000001",
                image_url: "/src/common/img/logo.png"
            },
            created_time: "1449752180"
        }, {
            id: "2",
            type: '2',
            action: 1,
            category: {
                "id": "1",
                "name": "小型车",
                "brief": "小型车",
                "image_id": "7",
                "parent_id": "0",
                "created_time": "1449819740",
                "path": "1",
                "category_img_path": "/uploadFiles/50becdafda1f41c2f6a409909bffd32f.jpg"
            }
        }]
    );

};