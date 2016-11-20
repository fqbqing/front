/**
 * Created by baba on 16/6/20.
 */
var mockup = require('bat-ria-tool/mockup');



//
//exports.response = function (path, params) {
//    return mockup.ok({
//        account: {
//            rsaPublicKey: "-----BEGIN PUBLIC KEY-----↵MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnArqLObR0IBAuBW7RZgQj6rZE↵BCXoHzIBvBCv85AnTrpROPCdfXxotuIBcTfsniV83CM0MhOHPJu3UddsPBXKYO3A↵JX7kyc7Qv5fQ1IOeLTWrWGhQwRIRK5tAXwkXMscEEx1EjeIlwLUHjFHOzTucBCME↵dQpH6DJ33vZCb0ErfwIDAQAB↵-----END PUBLIC KEY-----↵",
//        },
//        merchant_id: "1466135938706481",
//        merchant_name: "北京知春路XXX4S店",
//        merchant_status: 0
//    });
//};
//
exports.response = function (path, params) {
    return mockup.ok({
        account: {
            aliPublicKey: "520888",
            partner: "45212319921204",
            rsaPrivateKey:
                "-----BEGIN RSA PRIVATE KEY-----↵MIICXQIBAAKBgQCnArqLObR0IBAuBW7RZgQj6rZEBCXoHzIBvBCv85AnTrpROPCd↵fXxotuIBcTfsniV83CM0MhOHPJu3UddsPBXKYO3AJX7kyc7Qv5fQ1IOeLTWrWGhQ↵wRIRK5tAXwkXMscEEx1EjeIlwLUHjFHOzTucBCMEdQpH6DJ33vZCb0ErfwIDAQAB↵AoGBAJzR4RwOSTWpTcgI7e/N3SFkqVTgmD+H20rprrmo+LkQIb9WugkH5aPl5f34↵s8yJCyZdBuliBBg+fvD59k/5c3MZuyDP6AGzLJdPfHh6UgkN5HgqX/lSK3IePpiu↵U958MMdIEQQBu3RffK8dAHk9SFUDrgHhke6xPJomKRUlVaOBAkEA3OMeuTOGdcma↵q+5lJXyFrJ/S+Lh3pBEUh4roM5j0QodFxH8Ql9w+FecnuwbquKqHt6SYEUw366im↵aFHtjHW7IQJBAMGPIjR4wYxhFnGQHHTvVhIwO2dqaP3Vbh6XJoliyafXsePajE8E↵RhZx3DddYqvNYcIvaNr4PlltLL98vUJlsp8CQFq0aUlj/zMfNoSjwKVEHSBmARxh↵o7+bw/Jk+DU3+hXXtq6Z/xZdOqGD6qzCimCKpnCjBk8UHWKIPs1X11R2hAECQD4m↵KlJ0z5i2d9Fg93Iogxd1+yz6gtm2FRSnbc1BNgS5gjnqK5EXizWbu5zfVFZbrN8A↵AAgHG2X1Yx/c+pv+MXsCQQCKLwdJoHVwQDcmGTyD+R6FUCIbVhyfAKoPSpRpWCac↵UwE/Nc/eTMglAHb2dclXw0enylrrw5XuyXHXgWEK5Qgk↵-----END RSA PRIVATE KEY-----↵",
            rsaPublicKey: "-----BEGIN PUBLIC KEY-----↵MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnArqLObR0IBAuBW7RZgQj6rZE↵BCXoHzIBvBCv85AnTrpROPCdfXxotuIBcTfsniV83CM0MhOHPJu3UddsPBXKYO3A↵JX7kyc7Qv5fQ1IOeLTWrWGhQwRIRK5tAXwkXMscEEx1EjeIlwLUHjFHOzTucBCME↵dQpH6DJ33vZCb0ErfwIDAQAB↵-----END PUBLIC KEY-----↵",
            seller: "zhifubaozhanghao111",
            status: 1,
            type: 1
        },
        merchant_id: "1466135938706481",
        merchant_name: "北京知春路XXX4S店",
        merchant_status: 0
    });
};
//exports.response = function (path, params) {
//    return mockup.ok({
//        account: null,
//        merchant_id: "1466135938706481",
//        merchant_name: "北京知春路XXX4S店",
//        merchant_status: 0
//    });
//};