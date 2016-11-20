/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var etpl = require( 'etpl' );
    var u = require('underscore');
    var config = require('./config');
    var level = require('common/level');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function CustomerInfoModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */

    CustomerInfoModel.prototype.datasource = {
        userInfo: function (model) {
            return api.getCustomerById({
                id: model.get('id')
            }).then(function(data){
                var item = u.find(config.allRating,function(ele){
                    return data.rating === ele.value
                });
                data.ratingName = item ? item.name : '';
                return data;
            });
        },
        tuanData: function (model) {
            if (level.isAllow('tuan-order.list')) {
                return api.listTuanOrder({
                    customer_id: model.get('id')
                }).then(function(page){
                    return page.data || page.result;
                });
            }
            return [];
        },
        grouponData: function (model) {
            if (level.isAllow('groupon-activity.list')) {
                return api.listGrouponSignup({
                    customer_id: model.get('id')
                }).then(function(page){
                    return page.data || page.result;
                });
            }
            return [];
        },
        allRating: function(){
            return config.allRating;
        },
        trackList: function(model){
            return api.getCustomerTrack({
                customer_id: model.get('id'),
                pageSize: 10,
                pageNo: 1
            }).then(function(page){
                u.each(page.data,function(element){
                    element.isShow = false;
                });
                return page;
            });
        },
        exhibitionData: function (model) {
            return api.listExhibitionOrder({
                customer_id: model.get('id')
            }).then(function(page){
                return page.data || page.result ;
            });
        },
        voucherData: function (model) {
            return api.voucherOrderList({
                customer_id: model.get('id')
            }).then(function(page){
                return page.data || page.result ;
            });
        },
        config: function () {
            return config;
        }
    };
    CustomerInfoModel.prototype.updateRating = function(e){
        return api.updateCustomer({
            id: this.get('id'),
            rating: e.rating
        })
    };
    CustomerInfoModel.prototype.updateName = function(e){
        return api.updateCustomer({
            id: this.get('id'),
            name: e.name
        })
    };
    CustomerInfoModel.prototype.updateTrack = function(e){
        return api.updateCustomerTrack({
            track_id: e.track_id,
            content: e.content
        })
    };
    CustomerInfoModel.prototype.deleteTrack = function(e){
        return api.deleteCustomerTrack({
            track_id: e.track_id
        })
    };
    CustomerInfoModel.prototype.addTrack = function(e){
        return api.addCustomerTrack({
            customer_id: this.get('id'),
            content: e.content
        })
    };
    CustomerInfoModel.prototype.getTrack = function(e){
        return api.getCustomerTrack({
            customer_id: this.get('id'),
            pageSize: e.pageSize,
            pageNo: e.pageNo
        }).then(function(page){
            u.each(page.data,function(element){
                element.isShow = false;
            });
            return page;
        });
    };
    CustomerInfoModel.prototype.distribute = function (e) {
        var me = this;
        var data = {
            id: e.id,
            user_company_id: e.user_company_id
        };
        if(!e.cur_user_company_id) {
            //无归属分配
            return api.distributeCustomerPublic(data);
        }else {
            //有归属非配
            return api.distributeCustomer(data);
        }
    }
    // return模块
    require('er/util').inherits(CustomerInfoModel, BaseModel);
    return CustomerInfoModel;
});
