var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok([{
        "id": 158,
        "description": "广汽传祺",
        "name": "广汽传祺",
        "pic": "b_158.png",
        "type": "G"
    },{
        "id": 159,
        "description": "宝马",
        "name": "宝马",
        "pic": "b_158.png",
        "type": "G"
    }]);
};
