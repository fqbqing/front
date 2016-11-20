var mockup = require('bat-ria-tool/mockup');

exports.response = function (path, params) {
    return mockup.ok(
        {
            'id':'37',
            'organization_id':'36',
            'name':'11',
            'phone':'13953561937',
            'gender':null,
            'channel':{
                'id':'20011',
                'related_id':'0',
                'name':'测试4S店1',
                'type':'2',
                'valid_status':'0',
                'created_time':'1456820338',
                'updated_time':'1457434719',
                'modified_by':'mall-console_anonymous',
                'created_by':'admin_24',
                'organization_id':'36'
            },
            'rating':'A',
            'updated_time':'1458123443',
            'created_time':'1457349679',
            'valid_status':'0',
            'modified_by':'admin_63',
            'created_by':'mall_380',
            'user_company_id':'31',
            'owner':{
                'id':'31',
                'username':'liwang',
                'user_info_id':'3',
                'phone1':'13552862513',
                'phone2':'',
                'name':'李旺',
                'group_id':'38',
                'valid_status':'0',
                'password':'8bbc36ea2ba7571bee1e7fc19d312c04',
                'passwd_modified':'1',
                'access_token':null,
                'auth_key':'7pdN8spVr2064KjmF2tuJTGHSIzfd1iU',
                'created_time':null,
                'updated_time':'1456974953',
                'modified_by':'admin_24',
                'created_by':'admin_24',
                'in_charge':'1',
                'title':'销售总监'
            }
        }
    );

};