/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./chooser.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodSpecificationChooserView() {
        BaseView.apply(this, arguments);
    }

    GoodSpecificationChooserView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GoodSpecificationChooserView.prototype.template = 'TPL_good_specification_chooser';

    /**
     * @inheritDoc
     */
    GoodSpecificationChooserView.prototype.uiProperties = {

    };

    GoodSpecificationChooserView.prototype.getVueOptions = function () {
        var me = this;
        var selectedSpecs = me.model.get('selectedSpecs');
        return {
            methods: {
                changeState: function (spec) {
                    spec.selected = !spec.selected;
                    if (spec.selected) {
                        selectedSpecs.push({
                            id: spec.id,
                            name: spec.name
                        });
                    }
                    else {
                        selectedSpecs.splice(u.findIndex(selectedSpecs, {
                            id: spec.id
                        }), 1);
                    }
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    GoodSpecificationChooserView.prototype.uiEvents = {};

    require('er/util').inherits(GoodSpecificationChooserView, BaseView);
    return GoodSpecificationChooserView;
});
