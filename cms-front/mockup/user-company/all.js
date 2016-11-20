var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.list(
        [{
            id:'11',// 用户id
            username:'janez',//用户名
            name:'zhongzhenmei',//姓名
            phone:'13265019973', //手机号
            user_group:{
                id:'3',
                name:'管理员'
            }
        },{
            id:'22',// 用户id
            username:'janez',//用户名
            name:'zhongzhenmei',//姓名
            phone:'13265019973', //手机号
            user_group:{
                id:'1',
                name:'游客'
            }
        }]
    );

};