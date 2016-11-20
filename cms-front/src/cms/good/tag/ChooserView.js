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
    function GoodTagChooserView() {
        BaseView.apply(this, arguments);
    }

    GoodTagChooserView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GoodTagChooserView.prototype.template = 'TPL_good_tag_chooser';

    /**
     * @inheritDoc
     */
    GoodTagChooserView.prototype.uiProperties = {

    };

    GoodTagChooserView.prototype.getVueOptions = function () {
        var me = this;
        var selectedTags = me.model.get('selectedTags');
        return {
            created: function () {
            },
            methods: {
                changeState: function (tag) {
                    tag.selected = !tag.selected;
                    if (tag.selected) {
                        selectedTags.push({
                            id: tag.id,
                            name: tag.name
                        });
                    }
                    else {
                        selectedTags.splice(u.findIndex(selectedTags, {
                            id: tag.id
                        }), 1);
                    }
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    GoodTagChooserView.prototype.uiEvents = {};

    require('er/util').inherits(GoodTagChooserView, BaseView);
    return GoodTagChooserView;
});
