/**
 * Created by Administrator on 2016/2/22 0022.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        [
            {
                name: "未分级",
                value: ""
            },
             {
                name: "即将购买",
                value: "H"
            },
             {
                name: "一周内购买",
                value: "A"
            },
             {
                name: "一个月内购买",
                value: "B"
            },
             {
                name: "三个月内购买",
                value: "C"
            },
             {
                name: "无效用户",
                value: "D"
            },
             {
                name: "战败",
                value: "F"
            },
             {
                name: "已经购买",
                value: "O"
            }
        ]
    );

};