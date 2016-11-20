/**
 * @file 
 * @author ()
 */

define(function (require) {
    var u = require('underscore');
    var api = require('common/config').api;
    var frozen = require('frozen');

    var config = {};

    config.template = require('./search.tpl.html');

	config.templateMainTarget = 'TPL_site_search';

    config.domEvents = {

	};

    config.events = {
        ready: function () {
            //var tab = new frozen.Scroll('.search-result-tab', {
            //    role: 'tab',
            //    autoplay: false
            //});
        },
        'leave': function () {
        },
        'revived': function () {
        },
        'sleep': function () {
        }
    };



    config.vueOptions = {
        data: {

        },
        events: {
            search: function (searchbox, keywords) {
                var me = this;
                var param = {
                    phone: keywords,
                    pageSize: 10
                }
                return api.globalSearchByPhone(param).then(function (data) {
                        me.result = data;
                });

            }
        }
    };

    return config;
});

