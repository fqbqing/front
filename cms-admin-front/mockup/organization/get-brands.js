/**
 * Created by lifayu on 16/5/12.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok([
        {
            letter: 'A',
            brands: [{
                id: 1,
                name: '奥迪'
            },{
                id: 2,
                name: '奥拓'
            }]
        }, {
            letter: 'B',
            brands: [{
                id: 2,
                name: '宝马'
            }]
        }
    ]);
};
