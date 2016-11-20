var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.list(
        [
            {
                id: "1",
                name: "????",
                start_time: "1463713862",
                end_time: "1463716862",
                share_image_url: "",
                status: "1",
                extra: '{"brief":"\u534e\u4e2d\u8f66\u5c55","page_title":"\u6765\u9886\u4f18\u60e0\u5238","introduce_text":"\u6765\u9886\u5427\uff01","voucher_introduce_text":"\u4f18\u60e0\u5238","rule":"\u5168\u573a\u6709\u6548"}',
                organization_id: "36",
                valid_status: "0",
                created_time: "1463713862",
                updated_time: "1463744256",
                created_by: "admin_11",
                modified_by: "admin_24",
                type: "0",
                images: [],
                vouchers: [],
                brief: "华中车展",
                page_title: "来领优惠券",
                introduce_text: "来领吧！",
                voucher_introduce_text: "优惠券",
                rule: "全场有效"
            }
        ]
    );

};