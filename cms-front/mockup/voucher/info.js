/**
 * Created by baba on 16/5/19.
 */

var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
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
    });

};