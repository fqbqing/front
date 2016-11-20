var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        id:'11',// 用户组id
        name:'管理员',//用户组名
        describe: '网站最高权限使用者',
        users:[{
            id: '32',
            name: 'zhongzhenmei'
        },{
            id: '33',
            name: 'sunhongbin'
        }]
    });

};