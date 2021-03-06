var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
        "order_id":"1451301693882494",
        "status":"1",
        "payment":"1",
        "created_time":"1451301693",
        "product":{
            "id":"43",
            "name":"福特新蒙迪欧2.0L GTDi200时尚型",
            "amount":"17880000",
            "specification":[
                {
                    "id":"26",
                    "name":"内饰颜色",
                    "display_type":"1",
                    "updated_time":"1451048225",
                    "created_time":"1451048225",
                    "valid_status":"0",
                    "modified_by":"system",
                    "specificationValue":{
                        "id":"40",
                        "specification_id":"26",
                        "name":"黑色",
                        "extra":"",
                        "updated_time":"1451048309",
                        "created_time":"1451048309",
                        "valid_status":"0",
                        "modified_by":"system"
                    }
                },
                {
                    "id":"27",
                    "name":"提车城市",
                    "display_type":"1",
                    "updated_time":"1451048241",
                    "created_time":"1451048241",
                    "valid_status":"0",
                    "modified_by":"system",
                    "specificationValue":{
                        "id":"42",
                        "specification_id":"27",
                        "name":"全国",
                        "extra":"",
                        "updated_time":"1451048349",
                        "created_time":"1451048349",
                        "valid_status":"0",
                        "modified_by":"system"
                    }
                },
                {
                    "id":"25",
                    "name":"车身颜色",
                    "display_type":"1",
                    "updated_time":"1451048216",
                    "created_time":"1451048216",
                    "valid_status":"0",
                    "modified_by":"system",
                    "specificationValue":{
                        "id":"43",
                        "specification_id":"25",
                        "name":"珍珠白",
                        "extra":"",
                        "updated_time":"1451103503",
                        "created_time":"1451103503",
                        "valid_status":"0",
                        "modified_by":"system"
                    }
                }
            ],
            "get_car_city":"全国"
        },
        "user_info":{
            "user_name":"黄香珍",
            "user_phone":"18627862109"
        },
        "deposit":1,
        "get_car":"到店提车",
        "trade":"线上支付定金，到店支付尾款",
        "get_car_code":"xV6L028e",
        "expire_time":1453893718
    });

};