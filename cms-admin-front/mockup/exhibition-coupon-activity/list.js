/**
 * Created by Administrator on 2016/4/8 0008.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok({
       totalCount: "1",
       pageNo: 1,
       pageSize: 15,
       orderBy: null,
       order: null,
       data: [
          {
             id: "2",
             exhibition_coupon_id: "5",
             exhibition_id: "1",
             organization_id: "36",
             extra: "",
             valid_status: "0",
             created_time: "1459326146",
             updated_time: "1459326146",
             created_by: "admin_24",
             modified_by: "admin_24",
             defaultImage: "/uploadFiles/388bb3e5a968b9fafb9049f3be64791b.png",
             shareImage: "/uploadFiles/07eeb8b9dc52c63bedf0be2394d02b73.jpg",
             exhibitionCoupon: {
                id: "5",
                exhibition_id: "1",
                image_default_id: "1",
                share_image_id: "7",
                activity_start_time: "1459785600",
                activity_end_time: "1459795600",
                coupon_start_time: "1459785600",
                coupon_end_time: "1459785600",
                extra: '{"activity_title":"\u5357\u4eac\u8f66\u5c55\u8d2d\u8f66\u793c","activity_introduction":"\u8f66\u5c55\u89c2\u4f17\u5747\u53ef\u9886\u53d6","activity_address":"\u5357\u4eac\u8f66\u5c55","coupon":"10\u5143\u8d2d\u7535\u996d\u7172\u5238","activity_invitation":"\u9080\u8bf7\u60a8\u6765\u9886\u8d2d\u8f66\u793c","activity_page_title":"\u6765\u9886\u8d2d\u8f66\u793c\u5427","coupon_used_introduction":"\u5747\u53ef\u4f7f\u7528","coupon_used_detail_introduction":"\u8f66\u5c55\u7528\u6237\u5747\u53ef\u4f7f\u7528"}',
                valid_status: "0",
                created_time: "1459485048",
                updated_time: "1459485048",
                created_by: "admin_24",
                modified_by: "admin_24",
                defaultImage: {
                   id: "1",
                   usage: "0",
                   extension: "png",
                   signature: "388bb3e5a968b9fafb9049f3be64791b",
                   updated_time: "1451124196",
                   created_time: "1451124196",
                   valid_status: "0",
                   modified_by: "system",
                   created_by: "system"
                },
                shareImage: {
                   id: "7",
                   usage: "0",
                   extension: "jpg",
                   signature: "07eeb8b9dc52c63bedf0be2394d02b73",
                   updated_time: "1451124916",
                   created_time: "1451124916",
                   valid_status: "0",
                   modified_by: "system",
                   created_by: "system"
                },
                activity_title: "南京车展购车礼",
                activity_introduction: "车展观众均可领取",
                activity_address: "南京车展",
                coupon: "10元购电饭煲券",
                activity_invitation: "邀请您来领购车礼",
                activity_page_title: "来领购车礼吧",
                coupon_used_introduction: "均可使用",
                coupon_used_detail_introduction: "车展用户均可使用"
             },
             order_count: 16,
             claimed_order_count: 8,
             unclaimed_order_count: 8
          }
       ]
    });

};