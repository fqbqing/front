/**
 * @file etpl过滤器
 * @author lifayu@baidu.com
 */

define(function (require) {
    var etpl = require('etpl');
    var moment = require('moment');
    var utils = require('common/utils');


    etpl.addFilter('dft', function (value, dft) {
        return value || dft;
    });
    etpl.addFilter('safeAlias', function (value) {
        return value.replace(/[\+\-\*\/]/g, '_');
    });
    etpl.addFilter('amount', function (source) {
        return utils.getAmount(source);
    });

    etpl.addFilter('date', function (value, formatrer) {
        return utils.dateFormat(value, formatrer);
    });
    etpl.addFilter('tuanStatus', function (status) {
        return utils.getTuanStatus(status);
    });
    etpl.addFilter('orderStatus', function (status) {
        return utils.getOrderStatus(status);
    });
    etpl.addFilter('paymentText', function (payment) {
        return utils.getPaymentText(payment);
    });

    etpl.addFilter('ordered', function (value) {
        return parseInt(value) + 1;
    });
    etpl.addFilter('enlarged', function (value,num,flag,start) {
        if(flag){
            if(value+1 > start){
                return parseInt(value) + num + 1 ;
            }
        }
        return parseInt(value) + num;
    });
    etpl.addFilter('mapCarBuyWay', function (value) {
        return utils.mapCarBuyWay(value);
    });
    etpl.addFilter('exhibitionStatus', function (status) {
        return utils.getExhibitionStatus(status);
    });

    etpl.addFilter('ad_place_format', function (key ,list) {
        return utils.translateToValue(key,list);
    });
    etpl.addFilter('province_format', function (key ,list) {
        return utils.provinceFormat(key,list);
    });
    etpl.addFilter('imgUrl', function (url, width, height) {
        return utils.imgUrl(url, width, height);
    });
    etpl.addFilter('payment-types', function (key) {
        return utils.getPaymentText(key);
    });

    etpl.addFilter('voucher-order-status', function (value) {
        return utils.getVoucherOrderStatus(value);
    });
    etpl.addFilter('capitalMoney', function (num) {
        return utils.capitalMoney(num);
    });
});
