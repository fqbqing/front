var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    var list = [];
    for (var i = 0; i < 15; i++) {
        list.push({
            'id': (i + 1) * params.pageNo,
            'title': '7月' + i + '号大型团购会',
            'pic': 'http://img01.chedamai.cn/uploadFiles/20160601_1464764821122517.jpg',
            'time': '1468321395',
            'address': '北京市海淀区知春路48号',
            'status': '2',
            'awards': [{
                'processType': 1, // 报名 \ 成交
                'awardType': 1,  // 优惠卷 \ 现金
                'coupon': {
                    'title': '免费保养一次',
                    'content': '使用该券可在本店免费保养一次',
                    'validTime': ''
                }
            }, {
                'processType': 2, // 报名 \ 成交
                'awardType': 2,  // 优惠卷 \ 现金
                'amount': 50000
            }]
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
