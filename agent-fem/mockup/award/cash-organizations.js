var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    var list = [];
    for (var i = 0; i < 15; i++) {
        list.push({
            organization: {
                id: (i + 1) * params.pageNo,
                name: '知春路4S店_' + i + '分店',
                phone: '40088889999',
                address: '北京市海淀区知春路48号'
            },
            amount: i * 100
        });
    }
    return mockup.list(list, {
        pageNo: params.pageNo,
        pageSize: 15,
        totalCount: 100,
        orderBy: 'id',
        order: 'desc'
    });
};
