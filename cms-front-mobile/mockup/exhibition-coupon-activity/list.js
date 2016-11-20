/**
 * Created by baba on 16/4/7.
 */
var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        {
            "totalCount":"2",
            "pageNo":1,
            "pageSize":15,
            "orderBy":null,
            "order":null,
            "data":[
                {
                    "id":"6",
                    "exhibition_coupon_id":"1",
                    "exhibition_id":"1",
                    "organization_id":"327",
                    "extra":"[]",
                    "valid_status":"0",
                    "created_time":"1459860965",
                    "updated_time":"1459860965",
                    "created_by":"admin_24",
                    "modified_by":"admin_24",
                    "default_image":"/uploadFiles/07eeb8b9dc52c63bedf0be2394d02b73.jpg",
                    "share_image":"/uploadFiles/86cd69b365b6a79aefa7b758de66acd3.jpg",
                    "activity_introduction":"车展观众均可领取,每人限领取一份,限500份,先到先得",
                    "activity_invitation":"邀您来拿购车礼啦!",
                    "activity_address":"南京国际会展中心",
                    "activity_title":"2016第九届南京国际汽车博览会专属购车礼!",
                    "activity_page_title":"来领购车礼吧!",
                    "coupon":"10元购车饭煲礼卷",
                    "coupon_used_introduction":"车展现场购车用户可凭借此卷10元领取电饭煲一个",
                    "coupon_used_detail_introduction":"本卷仅用于南京车展",
                    "activity_start_time":"1459238757",
                    "activity_end_time":"1459238757",
                    "coupon_start_time":"1459238757",
                    "coupon_end_time":"1459238757",
                    "claimed_order_count":0,
                    "unclaimed_order_count":0,
                    "order_count":0
                },
                {
                    "id":"7",
                    "exhibition_coupon_id":"1",
                    "exhibition_id":"1",
                    "organization_id":"327",
                    "extra":"",
                    "valid_status":"0",
                    "created_time":"1459860965",
                    "updated_time":"1459860965",
                    "created_by":"admin_24",
                    "modified_by":"admin_24",
                    "default_image":"/uploadFiles/07eeb8b9dc52c63bedf0be2394d02b73.jpg",
                    "share_image":"/uploadFiles/86cd69b365b6a79aefa7b758de66acd3.jpg",
                    "activity_introduction":"车展观众均可领取,每人限领取一份,限500份,先到先得",
                    "activity_invitation":"邀您来拿购车礼啦!",
                    "activity_address":"南京国际会展中心",
                    "activity_title":"2016第九届南京国际汽车博览会专属购车礼!",
                    "activity_page_title":"来领购车礼吧!",
                    "coupon":"10元购车饭煲礼卷",
                    "coupon_used_introduction":"车展现场购车用户可凭借此卷10元领取电饭煲一个",
                    "coupon_used_detail_introduction":"本卷仅用于南京车展",
                    "activity_start_time":"1459238757",
                    "activity_end_time":"1459238757",
                    "coupon_start_time":"1459238757",
                    "coupon_end_time":"1459238757",
                    "claimed_order_count":0,
                    "unclaimed_order_count":0,
                    "order_count":0
                }
            ]
        }

    );

};