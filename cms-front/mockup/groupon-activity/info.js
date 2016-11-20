var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
        "id": "1",
        "name": "一汽丰田全系现车限时大惠战",
        "created_time": "1451376494",
        "updated_time": "1451376494",
        "valid_status": "0",
        "modified_by": "system",
        "signup_start_time": "1451376494",
        "signup_end_time": "1456848000",
        "activity_time": "1452924000",
        "beautify_number": "16",
        "image": "/uploadFiles/ce54c9541615d6cfe8221d9205d55894.jpg",
        "shareImage": "/uploadFiles/50becdafda1f41c2f6a409909bffd32f.jpg",
        //"intention": null,
        "intention": {
            "name": "预付199元抵1000元购车补贴",
            "amount": "199",
            "instruction": "1、已经缴纳意向金的用户bababa\n2、对于已经缴纳异想记但未但与线下活动的用户"
        },
        "tuanStatus": 1,
        "orderId": "137",
        "page_info": {
            global: {
                price: '全场7折',
                organization_name: '知春路',
                address: '北京市海淀区知春路48-20B',
                buytips: '温馨提示：现场订车用户请携身份证和订金（现金或刷卡皆可）以便现场办理订车手续'
            },
            items: [{
                type: 'TITLE',
                text: '多重好礼',
                style: ''
            }, {
                type: 'IMAGE',
                url: 'http://malltest.babamaiche.com/uploadFiles/20160406_1459927386617716.jpg'
            }, {
                type: 'IMAGE_TEXT',
                text: '图片描述',
                url: 'http://malltest.babamaiche.com/uploadFiles/20160406_1459927386617716.jpg'
            }, {
                type: 'ARTICLE',
                data: {
                    title: '一重礼',
                    content: '来店既有精美礼品相送'
                }
            }, {
                type: 'ARTICLE_GROUP',
                data: [{
                    title: '特色1',
                    content: '哈哈哈'
                }, {
                    title: '特色2',
                    content: '哈哈哈哈哈呵呵呵呵呵'
                }]
            }]
        },
        "option": [{
            name: '期望车型',
            value: 'x1\nx2\nx3',
            type: 'checkbox',
            required: true
        }, {
            name: '购车方式',
            value: '贷款购车\n全款购车\n未确定',
            type: 'radio'
        }],
        "agent_awards": {
            singupAward: {
                "stage":1,
                "type":2,
                "amount":100
            },
            dealAward: {
                "stage":2,
                "type":3,
                "voucher_id":1,
                "voucher": {
                    id: "1",
                    name: "矿泉水",
                    content: '{"brief":"\u534e\u4e2d\u8f66\u5c55","instruction":"\u6765\u9886\u4f18\u60e0\u5238"}',
                    image_url: "/uploadFiles/3f42a6a5cb865142fae89ed57e18160a.jpg",
                    amount: "1",
                    start_time: "0",
                    end_time: "0",
                    count: "50",
                    used_count: "10",
                    initiator_type: "0",
                    voucher_category_id: "1",
                    extra: "",
                    organization_id: "36",
                    valid_status: "0",
                    created_time: "1463713862",
                    updated_time: "1463713862",
                    created_by: "",
                    modified_by: "",
                    version: "0",
                    organization: {
                        id: "4",
                        phone: "4008955088",
                        group_id: "36",
                        name: "知春路4s",
                        manager_name: "王肇刚",
                        manager_phone: "13810682928",
                        manager_title: "总经理",
                        staff_id: "5",
                        extra: "",
                        valid_status: "0",
                        created_time: "1456820338",
                        updated_time: "1463469936",
                        modified_by: "super_5",
                        created_by: "admin_24",
                        sale_group_id: "38",
                        market_group_id: "39",
                        show_public_customers: "1",
                        address: "真的在知春路",
                        level_id: "3",
                        level_expire_time: "0",
                        logo_image_id: "7",
                        location_id: "1847",
                        province_id: "1845",
                        city_id: "1846",
                        merchant_id: ""
                    },
                    brief: "华中车展",
                    instruction: "来领优惠券"
                }
            }
        }
    });
};
