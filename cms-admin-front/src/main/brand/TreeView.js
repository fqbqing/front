/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./tree.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');


    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function BrandTreeView() {
        BaseView.apply(this, arguments);
    }

    BrandTreeView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    BrandTreeView.prototype.template = 'TPL_brand_tree';

    /**
     * @inheritDoc
     */
    BrandTreeView.prototype.uiProperties = {

    };

    BrandTreeView.prototype.getVueOptions = function () {
        return {
            data: {

            }
        };
    };
    /**
     * @inheritDoc
     */
    BrandTreeView.prototype.uiEvents = {};

    require('er/util').inherits(BrandTreeView, BaseView);
    return BrandTreeView;
});
