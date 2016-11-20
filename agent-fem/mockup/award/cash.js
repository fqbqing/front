var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    //return mockup.fail('用户不存在');
    return mockup.ok({
        total: 1000000,
        toWithdraw: 50000,
        withdraw: 20000
    });
};
