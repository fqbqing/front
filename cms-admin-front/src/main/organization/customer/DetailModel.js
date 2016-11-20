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
    var cons = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationCustomerDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OrganizationCustomerDetailModel.prototype.datasource = {
        userInfo: function (model) {
            return api.getCustomerById({
                id: model.get('id')
            }).then(function(data){
                var item = u.find(cons.CUSTOMER_RATING,function(ele){
                    return data.rating === ele.value
                });
                data.ratingName = item ? item.name : '';
                return data;
            });
        },
        tuanData: function (model) {
            return api.listTuanOrder({
                customer_id: model.get('id')
            }).then(function(page){
                return page.data || page.result;
            });

        },
        exhibitionData: function (model) {
            return api.listExhibitionOrder({
                customer_id: model.get('id')
            }).then(function(page){
                return page.data || page.result ;
            });
        },
        grouponData: function (model) {
            return api.grouponSignupList({
                customer_id: model.get('id')
            }).then(function(page){
                return page.data || page.result;
            });

        }
    };

    // return模块
    require('er/util').inherits(OrganizationCustomerDetailModel, BaseModel);
    return OrganizationCustomerDetailModel;
});
