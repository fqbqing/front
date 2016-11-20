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
    function GoodSpecificationChooserModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    GoodSpecificationChooserModel.prototype.datasource = {
        specifications: function (model) {
            var selectedSpecs = model.get('selectedSpecs');
            var map = {};
            u.each(selectedSpecs, function (item) {
                map[item.id] = true;
            });
            return api.listSpecification().then(function (page) {
                var specifications = page.result || page.data;
                u.each(specifications, function (spec) {
                    spec.selected = map[spec.id];
                });
                return specifications;
            });
        }
    };


    // return模块
    require('er/util').inherits(GoodSpecificationChooserModel, BaseModel);
    return GoodSpecificationChooserModel;
});
