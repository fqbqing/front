var mockup = require(bat-ria-tool/mockup);

exports.response = function (path, params) {

    return mockup.ok({
        "acl": {
            "desc": "权限",
            "actions": {
                "get-all-controllers": "get-all-controllers",
                "get-all-actions": "get-all-actions",
                "get-all": "get-all",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "activity": {
            "desc": "活动",
            "actions": {
                "info": "info",
                "list": "list",
                "add": "add",
                "good-list": "good-list",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "activity-good": {
            "desc": "活动商品",
            "actions": {
                "add": "add",
                "edit-good": "edit-good",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "activity-image": {
            "desc": "活动图片",
            "actions": {
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "activity-show": {
            "desc": "活动展示",
            "actions": {
                "info": "info",
                "update": "update",
                "add": "add",
                "list": "list",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "category": {
            "desc": "分类",
            "actions": {
                "list": "list",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "good": {
            "desc": "商品",
            "actions": {
                "list": "list",
                "info": "info",
                "update": "update",
                "add": "add",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "good-detail": {
            "desc": "商品详情",
            "actions": {
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "image": {
            "desc": "图片",
            "actions": {
                "upload": "upload",
                "get-image-url-by-id": "get-image-url-by-id",
                "list": "list",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "order": {
            "desc": "订单",
            "actions": {
                "get-order": "get-order",
                "list": "list",
                "info": "info",
                "update": "update",
                "search": "search",
                "add": "增加",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "product": {
            "desc": "货品",
            "actions": {
                "list": "list",
                "info": "info",
                "get-spe-by-good-id": "get-spe-by-good-id",
                "get-value-by-spe-id": "get-value-by-spe-id",
                "add": "add",
                "good-and-spe": "good-and-spe",
                "test": "test",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "product-specification-value": {
            "desc": "货品规格取值",
            "actions": {
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "specification": {
            "desc": "规格",
            "actions": {
                "get-spec-and-value": "get-spec-and-value",
                "list": "list",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "specification-value": {
            "desc": "规格取值",
            "actions": {
                "info": "info",
                "list": "list",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "tag": {
            "desc": "标签",
            "actions": {
                "list": "list",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "tuan": {
            "desc": "团购活动",
            "actions": {
                "get": "get",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "*": "全部"
            }
        },
        "tuan-order": {
            "desc": "团购订单",
            "actions": {
                "list": "list",
                "info": "info",
                "update": "update",
                "excel": "excel",
                "add": "增加",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "user-company": {
            "desc": "内部用户",
            "actions": {
                "session": "session",
                "add": "add",
                "update": "update",
                "test": "test",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "user": {
            "desc": "用户",
            "actions": {
                "list": "list",
                "search": "search",
                "add": "增加",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "user-group": {
            "desc": "内部用户组",
            "actions": {
                "add": "add",
                "update": "修改",
                "delete": "删除",
                "all": "获取全部数据",
                "list": "列表或查找",
                "get": "获取单条数据",
                "*": "全部"
            }
        },
        "role": {
            "desc": "角色",
            "actions": {
                "*": "全部"
            }
        }
    });

};