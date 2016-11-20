var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [{
            id: "1",
            created_time: "1449752180",
            bn: "10003", //商品编号
            name: "奔驰aa最好的奔驰车aa最好的奔驰车aa最好的奔驰车aa最好的奔驰车aa最好的奔驰车aa",
            image_default_id: "12",
            brief: "最好的奔驰车aa",
            marketable: "true",  //是否上架
            order: "41", //展示权重
            low_price: "150000001",
            high_price: "550000001",
            market_price: "480000001",
            image_url: "/src/common/img/logo.png",
            "specifications": [{
                "id": "25",
                "name": "车身颜色",
                "display_type": "1",
                "updated_time": "1451048216",
                "created_time": "1451048216",
                "valid_status": "0",
                "modified_by": "system"
            }, {
                "id": "26",
                "name": "内饰颜色",
                "display_type": "1",
                "updated_time": "1451048225",
                "created_time": "1451048225",
                "valid_status": "0",
                "modified_by": "system"
            }, {
                "id": "27",
                "name": "提车城市",
                "display_type": "1",
                "updated_time": "1451048241",
                "created_time": "1451048241",
                "valid_status": "0",
                "modified_by": "system"
            }]
        },{
            id: "2",
            created_time: "1449752180",
            bn: "10003", //商品编号
            name: "奔驰bb",
            image_default_id: "12",
            brief: "最好的奔驰车aa",
            marketable: "true",  //是否上架
            order: "42", //展示权重
            low_price: "15000000",
            high_price: "55000000",
            market_price: "48000000",
            image_url: "/src/common/img/logo.png",
            "specifications": [{
                "id": "25",
                "name": "车身颜色",
                "display_type": "1",
                "updated_time": "1451048216",
                "created_time": "1451048216",
                "valid_status": "0",
                "modified_by": "system"
            }, {
                "id": "26",
                "name": "内饰颜色",
                "display_type": "1",
                "updated_time": "1451048225",
                "created_time": "1451048225",
                "valid_status": "0",
                "modified_by": "system"
            }]
        }]
    );

};