/**
 * Created by Administrator on 2016/4/8 0008.
 */

var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok(
            {
                id: "4",
                exhibition_coupon_id: "5",
                exhibition_id: "1",
                organization_id: "36",
                extra: "[]",
                valid_status: "0",
                created_time: "1459485300",
                updated_time: "1459485300",
                created_by: "admin_24",
                modified_by: "admin_24",
                default_image: "/uploadFiles/388bb3e5a968b9fafb9049f3be64791b.png",
                share_image: "/uploadFiles/07eeb8b9dc52c63bedf0be2394d02b73.jpg",
                activity_title: "南京车展购车礼",
                activity_introduction: "车展观众均可领取",
                activity_address: "南京车展",
                coupon: "10元购电饭煲券",
                activity_invitation: "邀请您来领购车礼",
                activity_page_title: "来领购车礼吧",
                coupon_used_introduction: "均可使用",
                coupon_used_detail_introduction: "车展用户均可使用",
                activity_start_time: "1459785600",
                activity_end_time: "1459795600",
                coupon_start_time: "1459785600",
                coupon_end_time: "1459785600",
                claimed_order_count: 0,
                unclaimed_order_count: 0,
                order_count: 0
            }
        );

};