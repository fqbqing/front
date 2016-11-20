var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list([
        {
            id: '1',
            good: {
                id: '1',
                name: '福克斯'
            },
            specification: [{
                id: '1',
                name: '车身颜色',
                value: '烛光白'
            },{
                id: '2',
                name: '内饰颜色',
                value: '灰色'
            }],
            price: 100000,
            stock: 10
        }
    ]);

};