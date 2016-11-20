var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.list(
        [{
            id:'11',// 用户组id
            name:'管理员',//用户组名
            describe: '网站最高权限使用者'
        },{
            id:'11',// 用户组id
            name:'管理员',//用户组名
            describe: '网站最高权限使用者'
        }]
    );

};