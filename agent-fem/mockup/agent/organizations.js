var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    var list = [];
    for (var i = 0; i < 5; i++) {
        list.push({
            id: (i + 1) * params.pageNo,
            name: '知春路4S店_' + i + '分店',
            phone: '40088889999',
            address: '北京市海淀区知春路48号'
        });
    }
    return mockup.list(list, {
        pageNo: params.pageNo,
        pageSize: 15,
        totalCount: 5,
        orderBy: 'id',
        order: 'desc'
    });
};
