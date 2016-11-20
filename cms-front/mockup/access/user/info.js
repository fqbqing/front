var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        id: '11',// 用户id
        username: 'janez',//用户名
        name: 'zhongzhenmei',//姓名
        phone: '13265019973', //手机号
        user_group_id: '3',
        user_group: {
            id:'3',
            name:'管理员'
        },
        in_charge: "0",
        title:"zs"
    });

};