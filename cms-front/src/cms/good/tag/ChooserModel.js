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
    function GoodTagChooserModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    GoodTagChooserModel.prototype.datasource = {
        tags: function (model) {
            var selectedTags = model.get('selectedTags');
            var map = {};
            u.each(selectedTags, function (item) {
                map[item.id] = true;
            });
            return api.listTag().then(function (page) {
                var tags = page.result || page.data;
                u.each(tags, function (tag) {
                    tag.selected = map[tag.id];
                });
                return tags;
            });
        }
    };


    // return模块
    require('er/util').inherits(GoodTagChooserModel, BaseModel);
    return GoodTagChooserModel;
});
