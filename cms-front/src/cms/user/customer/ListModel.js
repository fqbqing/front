/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var user = require('bat-ria/system/user');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function UserCustomerListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listCustomer;
    }


    /**
     * @inheritDoc
     */
    UserCustomerListModel.prototype.datasource = {
        userInfo: function (model) {
            if (model.get('user_company_id')) {
                return api.getUserById({
                    id: model.get('user_company_id')
                });
            }
            return user.visitor;
        }
    };

    /**
     * @inheritDoc
     */
    // UserCustomerListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    UserCustomerListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    UserCustomerListModel.prototype.getExtraQuery = function () {
        var ret = {};
        if (this.get('user_company_id')) {
            ret.user_company_id = this.get('user_company_id');
        }
        else {
            var visitor = user.visitor;
            ret.user_company_id = visitor.id;
        }
        return ret;
    };

    UserCustomerListModel.prototype.distributeCustomer = function (data) {
        return api.distributeCustomer(data);
    };

    UserCustomerListModel.prototype.releaseCustomer = function (data) {
        return api.releaseCustomer(data);
    };

    // return模块
    require('er/util').inherits(UserCustomerListModel, ListModel);
    return UserCustomerListModel;
});
