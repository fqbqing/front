/**
 * Created by Administrator on 2016/4/8 0008.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {

    return mockup.ok(
        {
           id: "19",
           exhibition_coupon_id: "1",
           exhibition_id: "1",
           organization_id: "105",
           extra: "",
           valid_status: "0",
           created_time: "1461214869",
           updated_time: "1461214869",
           created_by: "super-console_anonymous",
           modified_by: "super-console_anonymous",
           default_image: "/uploadFiles/07eeb8b9dc52c63bedf0be2394d02b73.jpg",
           share_image: "/uploadFiles/86cd69b365b6a79aefa7b758de66acd3.jpg",
           activity_title: "2016第九届南京车博会专属购车礼！",
           activity_introduction: "车展观众均可领取，每人限领一份，限500份，先到先得",
           activity_address: "南京国际博览中心（河西）",
           coupon: "10元购电饭煲礼券",
           activity_invitation: "邀您来拿购车礼啦！",
           activity_page_title: "来领购车礼吧！",
           coupon_used_introduction: "车展现场购车用户可凭此券10元领取电饭煲一个",
           coupon_used_detail_introduction: "本活动适用于所有参加的2016年第九届南京车博会的购车用户，用户购车后可凭优惠券到车展现场“购车礼兑换处”兑换购车礼，并可免费参加线上抽奖，车展期间每日下午3点定时开奖，奖品丰厚，品牌电冰箱、 微波炉、高档行车记录仪免费拿，如有任何疑问，可咨询4008-955-088",
           activity_start_time: "1459238757",
           activity_end_time: "1459238757",
           coupon_start_time: "1459238757",
           coupon_end_time: "1559238757"
        }
    );

};