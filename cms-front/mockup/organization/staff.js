var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.list(
        [
            {
                "id":"11",
                "username":"janez",
                "name":"zhongzhenmei",
                "phone1":"13265019973",
                "group":{
                    "id":"3",
                    "name":"管理员"
                }
            },
            {
                "id":"22",
                "username":"janez",
                "name":"zhongzhenmei",
                "phone1":"13265019973",
                "group":{
                    "id":"1",
                    "name":"游客"
                }
            }
        ]
    );
};
