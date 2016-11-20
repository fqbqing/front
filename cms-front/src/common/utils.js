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
        getTuanOrderStatus: function(value){
            var map = this.prepareStatusMap(cons.TUAN_ORDER_STATUS_LIST);
            return map[value] || '未知';
        },
        getExhibitionStatus: function(value){
            var map = this.prepareStatusMap(cons.EXHIBITION_STATUS_LIST);
            return map[value] || '未知';
        },
        getOrderStatus: function(status){
            return this.translateStatus(status,cons.ORDER_STATUS_LIST,false);
        },
        getPaymentText: function(payment){
            var item = u.find(cons.PAYMENT_LIST,function(item){
                return item.value == payment;
            });
            var text = item ? item.text : '未选择支付方式';
            return text;
        },
        getActivityType: function(type){
            var item = u.find(cons.ACTIVITY_TYPE_LIST,function(item){
                return item.value == type;
            });
            var text = item ? item.name : '首页轮播';
            return text;
        },
        translateToValue: function(key,list){
            var item = u.find(list,function(item){
                return item.value == key;
            });
            var text = item ? item.name : '';
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
        imgUrl: function (url, width, height) {
            return cons.CDN_URL + url + '@'+ width + 'w_' + height + 'h_1e_1c.src';
        },
        getVoucherOrderStatus: function(value){
            var map = this.prepareStatusMap(cons.ORDER_STATUS_LIST);
            return map[value] || '未知';
        },
        getVoucherPayments: function(value){
            var map = this.prepareStatusMap(cons.VOUCHER_PAYMENT_LIST);
            return map[value] || '未知';
        },
        /**
         * 对多行文本进行过滤，去除空行和空格
         * @param {string} text
         * @return {string}
         */
        trimwhitespace: function (text) {
            var ret = [];
            var array = text.split('\n');
            u.each(array, function (item) {
                var value = item.replace(/\s*/g, '');
                if (value.length) {
                    ret.push(value);
                }
            });
            return ret.join('\n');
        },
        getPublicCustomer: function (value) {
            var map = this.prepareStatusMap(cons.SHOW_PUBLIC_CUSTOMER_LIST);
            return map[value] || '-';
        },
        getAgentSpread: function (value) {
            var map = this.prepareStatusMap(cons.AGENT_SPREAD_LIST);
            return map[value] || '-';
        }
    };
    return utils;
});
