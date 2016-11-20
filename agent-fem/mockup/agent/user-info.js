var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    //return mockup.fail('用户不存在');
    return mockup.ok({
        id: 1,
        name: '李发钰',
        avatar: 'xxx',
        phone: '18611081833'
    });
};
