var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.session(
        {
            username: '访问者',
            roleId: 1,
            id: 123,
            group: {
                "id": "2",
                "name": "技术部",
                "parent_id": "1",
                "organization_id": "1",
                "organization_name": "叭叭买车"
            },
            auth: {
                "acl": {
                    "update-permissions": true,
                    "get-permissions": true,
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true,
                    "info": true
                },
                "activity": {"info": true, "add": true, "delete": true, "update": true, "all": true, "list": true},
                "activity-good": {"list": true, "add": true, "delete": true, "update": true, "all": true, "info": true},
                "activity-image": {
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true,
                    "info": true
                },
                "activity-show": {"info": true, "update": true, "add": true, "delete": true, "all": true, "list": true},
                "category": {"add": true, "info": true, "delete": true, "update": true, "all": true, "list": true},
                "good": {"list": true, "info": true, "add": true, "update": true, "delete": true, "all": true},
                "good-detail": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true},
                "image": {
                    "upload": true,
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true,
                    "info": true
                },
                "order": {"list": true, "info": true, "update": true, "add": true, "delete": true, "all": true},
                "product": {"list": true, "info": true, "add": true, "update": true, "delete": true, "all": true},
                "product-specification-value": {
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true,
                    "info": true
                },
                "specification": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true},
                "specification-value": {
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true,
                    "info": true
                },
                "tag": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true},
                "tuan": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true},
                "tuan-order": {
                    "info": true,
                    "excel": true,
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true
                },
                "user-company": {
                    "add": true,
                    "update": true,
                    "update-password": true,
                    "reset-password": true,
                    "delete": true,
                    "all": true,
                    "list": true,
                    "info": true
                },
                "user": {
                    "info": true,
                    "get-tuan-orders": true,
                    "get-orders": true,
                    "add": true,
                    "update": true,
                    "delete": true,
                    "all": true,
                    "list": true
                },
                "user-group": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true},
                "role": {"add": true, "update": true, "delete": true, "all": true, "list": true, "info": true}
            }
        }
    );

    // return mockup.globalFail('无法读取用户信息！');

};
