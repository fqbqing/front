var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    var list = [];
    for (var i = 0; i < 15; i++) {
        list.push({
            type: Math.ceil(Math.random() * 2),
            status: Math.ceil(Math.random() * 3),
            organization: {
                id: i,
                name: '知春路4S店_' + i + '分店',
                phone: '40088889999',
                address: '北京市海淀区知春路48号'
            },
            amount: (i + 1) * 100,
            message: '不符合要求',
            coupon: {
                title: '免费保养一次',
                content: '使用该券可在本店免费保养一次',
                pic: 'http://img01.chedamai.cn/uploadFiles/20160712_1468329842891255.jpg'
            },
            created_time: '1468321395'
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
