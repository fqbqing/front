/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var u = require('underscore');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function GoodSpecificationValuesModel() {
        BaseModel.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodSpecificationValuesModel.prototype.datasource = {
        spec: function (model) {
            return api.getSpecificationById({
                id: model.get('id')
            });
        },
        specValues: function (model) {
            return api.listSpecificationValues({
                specification_id: model.get('id')
            }).then(function (list) {
                return u.map(list, function (item) {
                    item.editing = false;
                    return item;
                })
            });
        }
    };

    GoodSpecificationValuesModel.prototype.addSpecValue = function (item) {
        return api.addSpecificationValue(item);
    };

    GoodSpecificationValuesModel.prototype.deleteSpecValue = function (id) {
        return api.deleteSpecificationValue({
            id: id
        });
    };

    GoodSpecificationValuesModel.prototype.updateSpecValue = function (item) {
        return api.updateSpecificationValue(item);
    };

    // return模块
    require('er/util').inherits(GoodSpecificationValuesModel, BaseModel);
    return GoodSpecificationValuesModel;
});
