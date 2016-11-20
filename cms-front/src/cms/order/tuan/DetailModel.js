/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var moment = require('moment');
    var etpl = require( 'etpl' );
    var utils = require('common/utils');
    var constants = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrderTuanDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */

    etpl.addFilter( 'translateDate', function ( source, useExtra ) {
        return moment(source * 1000).format('YYYY-MM-DD HH:mm:ss');
    });
    etpl.addFilter( 'translateAmount', function ( source, useExtra ) {
        return source / 100;
    });
    OrderTuanDetailModel.prototype.datasource = {
        orderInfo: function (model) {
            return  api.getTuanOrderById({
                order_id: model.get('order_id'),
                amount:  model.get('amount')
            });
        },
        tuanOrderStatus:function () {
            return  constants.TUAN_ORDER_STATUS_LIST;
        },
        constants: function () {
            return constants;
        }
    };


    OrderTuanDetailModel.prototype.updateTuanOrder = function (e) {
        return api.updateTuanOrder(e);
    };


    // return模块
    require('er/util').inherits(OrderTuanDetailModel, BaseModel);
    return OrderTuanDetailModel;
});
