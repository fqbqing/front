/**
 * Created by Administrator on 2016/1/19 0019.
 */
/**
 * @file 公用方法库
 */

define(function (require) {
    var moment = require('moment');
    var u = require('underscore');
    var cons = require('common/constants');
    var utils = {
        timeFormatter: 'YYYY-MM-DD HH:mm:ss',
        getAmount: function (source) {
            return source / 100;
        },
        roundAmount: function (source) {
            return Math.floor(source * 100 + 0.5);
        },
        dateFormat: function (value, formatrer) {
            formatrer = formatrer || this.timeFormatter;
            if(value && value != 0){
                value = +value;
                if (value < 1000000000000) {
                    value *= 1000;
                }
                if (value > 2000000000000) {
                    return '';
                }
            }else{
                return '';
            }
            return moment(value).format(formatrer);
        },
        translateStatus: function(status,list,flag){
            var text = '';
            var item = u.find(list,function(item){
                return item.value == status;
            });
            //flag为true,表明是团购（活动）的订单状态
            if(flag){
                 text = item ? item.text : '报名成功';
            }else{
                 text = item ? item.text : '免费报名';
            }
            return text;
        },
        getTuanStatus: function(value){
            var map = this.prepareStatusMap(cons.TUAN_STATUS);
            return map[value] || '未知';
        },
        getExhibitionStatus: function(value){
            var map = this.prepareStatusMap(cons.EXHIBITION_STATUS);
            return map[value] || '未知';
        },
        getOrderStatus: function(status){
            return this.translateStatus(status,cons.ORDER_STATUS,false);
        },

        getPaymentText: function(payment){
            var item = u.find(cons.PAYMENTS,function(item){
                return item.value == payment;
            });
            var text = item ? item.text : '未选择支付方式';
            return text;
        },
        getActivityType: function(type){
            var item = u.find(cons.ACTIVITY_TYPE,function(item){
                return item.value == type;
            });
            var text = item ? item.name : '首页轮播';
            return text;
        },
        translateToValue: function(key,list){
            var item = u.find(list,function(item){
                return item.value == key;
            });
            var text = item ? (item.name || item.text) : '';
            return text;
        },
        mapCarBuyWay: function(num){
            return  cons.CAR_BUYING_WAY[num];
        },
        prepareStatusMap: function (array) {
            var map = {};
            u.each(array, function (item) {
                var arr = item.value.split('|');
                u.each(arr, function (it) {
                    map[it] = item.text;
                });
            });
            return map;
        },
        provinceFormat: function (key,list) {
            var item = u.find(list,function(item){
                return item.id == key;
            });
            var text = item ? item.name : '';
            return text;
        },
        isURL: function(str_url) {// 验证url
            var regexp = /^((http|https):\/\/)(([a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,})*(\/[.+]*)*/;
            return regexp.test(str_url);
        },
        imgUrl: function (url, width, height) {

            return cons.CDN_URL + url + '@'+ width + 'w_' + height + 'h_1e_1c';
        },
        getVoucherOrderStatus: function(value){
            var map = this.prepareStatusMap(cons.VOUCHER_ORDER_STATUS);
            return map[value] || '未知';
        },
        getVoucherPayments: function(value){
            var map = this.prepareStatusMap(cons.VOUCHER_PAYMENTS);
            return map[value] || '未知';
        },
        capitalMoney: function (num) {
            var strOutput = '';
            var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
            num += '00';
            var intPos = num.indexOf('.');
            if (intPos >= 0) {
                num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
            }
            strUnit = strUnit.substr(strUnit.length - num.length);
            for (var i=0; i < num.length; i++) {
                strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
            }
            return strOutput.replace(/零角零分$/, '整')
                .replace(/零[仟佰拾]/g, '零')
                .replace(/零{2,}/g, '零')
                .replace(/零([亿|万])/g, '$1')
                .replace(/零+元/, '元')
                .replace(/亿零{0,3}万/, '亿')
                .replace(/^元/, '零元');
        }


    };
    return utils;
});
