var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok({
        account_name: "hh",
        bank_account_num: "1234567",
        bank_branch_name: "hh",
        bank_city: "hh",
        bank_name: "hh",
        code_img_url:"/uploadFiles/20160620_1466406206504493.png",
        created_by:"admin_63",
        created_time:1466406238,
        customer_service_phone:"34567890",
        id:1,
        identity_card_front_img_url:"/uploadFiles/20160620_1466406211473983.jpg",
        identity_card_reverse_img_url:"/uploadFiles/20160620_1466406224832562.jpg",
        licence_img_url:null,
        manager_mail:"761780789@qq.com",
        manager_name:"hh",
        manager_phone:"13265019973",
        modified_by:"admin_63",
        organization_id:36,
        organization_name:"hh",
        updated_time:1466406238,
        valid_status:0
    });
};


//exports.response = function (path, params) {
//    return {
//        result: null,
//        success: true
//    };
//};