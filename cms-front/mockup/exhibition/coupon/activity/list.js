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
             id: "47",
             exhibition_coupon_activity_id: "2",
             exhibition_coupon_id: "5",
             user_id: "422",
             name: "",
             phone: "",
             customer_id: "84",
             status: "0",
             deal_customer_id: "0",
             extra: "",
             valid_status: "0",
             created_time: "1459933531",
             updated_time: "1459933531",
             created_by: "mall_422",
             modified_by: "mall_422",
             channel: "20016",
             order_id: "1459933531394546",
             signupChannel: {
                id: "20016",
                related_id: "75",
                name: "刘士云",
                type: "1",
                valid_status: "0",
                created_time: "1456823784",
                updated_time: "1457434719",
                modified_by: "mall-console_anonymous",
                created_by: "admin_24",
                organization_id: "36"
             },
             customer: {
                id: "84",
                organization_id: "36",
                name: "",
                phone: "18811695667",
                gender: "0",
                channel: "20016",
                rating: "",
                updated_time: "1459933531",
                created_time: "1459933531",
                valid_status: "0",
                modified_by: "mall_422",
                created_by: "mall_422",
                user_company_id: "75",
                user_id: "0",
                identification: ""
             },
             exhibitionCouponActivity:  {
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
                coupon_end_time: "1459785600"
             }
          }
       ]
    });

};