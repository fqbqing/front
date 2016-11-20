/**
 * Created by Administrator on 2016/3/9 0009.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        {
            id: "36",
            name: "测试4S店1",
            parent_id: "0",
            children: [
                 {
                    id: "37",
                    name: "4s店管理员",
                    parent_id: "36"
                },
                 {
                    id: "38",
                    name: "销售部",
                    parent_id: "36",
                    children:  [
                         {
                            id: "44",
                            name: "销售1组",
                            parent_id: "38"
                        },
                         {
                            id: "45",
                            name: "销售2组",
                            parent_id: "38"
                        },
                         {
                            id: "46",
                            name: "销售3组",
                            parent_id: "38"
                        }
                    ]
                },
                 {
                    id: "39",
                    name: "市场部",
                    parent_id: "36"
                }
            ]
        }
    );

};