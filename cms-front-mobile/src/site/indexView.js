/**
 * @file 
 * @author ()
 */

define(function (require) {

    var wx = require('wx');

    var URI = require('saber-uri');
    var constants = require('common/constants');
    var u = require('underscore');

    var config = {};

    config.template = require('./index.tpl.html');

	config.templateMainTarget = 'TPL_site_index';

    config.domEvents = {

	};

    config.events = {
        'ready': function () {
            var me = this;
            try {
                var wxConfig = me.model.get('wxConfig');
                wx.config(wxConfig);
            }
            catch (e) {
            }
        },
        'leave': function () {
        },
        'revived': function () {
        },
        'sleep': function () {
        }
    };

    /**
     * 核销订单
     * @param {string} result 扫描结果
     */
     function checkOrder(result) {
        var me = this;
        var uri = URI.parse(result);
        if (uri.scheme === 'chedamai_order') {
            var cn = uri.host;
            if (cn && cn.length > 0) {
                me.redirect('/tuan/order/check', {
                    cn: cn
                });
            }
            else {
                me.$view.showTip('优惠码不合法', 'warn');
            }
        }
        else if (uri.scheme === 'http' || uri.scheme === 'https') {
            if (u.indexOf(constants.SAFE_DOMAIN_LIST, uri.host) !== -1) {
                if (window.location.host === uri.host) {
                    me.redirect(uri.path + '?' + uri.query);
                }
                else {
                    window.location.href = result;
                }
            }
            else {
                me.$view.showTip('请扫描正确的优惠码', 'warn');
            }
        }
        else {
            me.$view.showTip('优惠码不合法', 'warn');
        }
    }

    config.vueOptions = {
        data: {
            phone: '',
            isSearchActive: false
        },
        methods: {
            scanQRCode: function () {
                var me = this;
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        checkOrder.call(me, result);
                        //if (result.indexOf('chedamai_order://') !== -1) {
                        //    var cn = result.substr(17);
                        //    if (cn.length > 0) {
                        //        me.redirect('/tuan/order/check', {
                        //            cn: cn
                        //        });
                        //    }
                        //    else {
                        //        me.$view.showTip('优惠码不合法', 'warn');
                        //    }
                        //}
                        //else {
                        //    me.$view.showTip('请扫描正确的优惠码', 'warn');
                        //}
                    }
                });
            },
            search: function () {
                if (this.isSearchActive) {
                    var keywords = $.trim(this.phone);
                    if (!keywords) {
                        this.isSearchActive = false;
                    }
                    else {
                        this.redirect('/search',{phone: encodeURIComponent(keywords)});
                    }
                }
                else {
                    this.isSearchActive = true;
                    $(this.$el).find('input').focus();
                }
            }
        },
        components: {
        }
    };

    return config;
});

