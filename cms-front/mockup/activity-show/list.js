var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [
            {
                "id":"26",
                "activity_id":"9",
                "type":"1",
                "url":"111",
                "order":"11",
                "updated_time":"1453257175",
                "created_time":"1453257160",
                "valid_status":"0",
                "modified_by":"admin_28",
                "activity":{
                    "id":"9",
                    "name":"汤圆",
                    "brief":"速度如风",
                    "image_default_id":"76",
                    "name_strategy":"",
                    "price_strategy":'[{"target":"price","operator":"multiply","param":"1","newField":"amount"},{"target":"price","operator":"multiply","param":"1000","newField":"deposit"}]',
                    "process_strategy":"",
                    "updated_time":"1452937704",
                    "created_time":"1452672872",
                    "valid_status":"0",
                    "modified_by":"admin_28"

                }
            }
        ]
    );

};