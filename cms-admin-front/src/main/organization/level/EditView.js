/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./edit.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var moment = require('moment');
    var utils = require('common/utils');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationLevelEditView() {
        FormView.apply(this, arguments);
    }

    OrganizationLevelEditView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationLevelEditView.prototype.template = 'TPL_organization_level_edit';

    /**
     * @inheritDoc
     */
    OrganizationLevelEditView.prototype.uiProperties = {

    };


    /**
     * @inheritDoc
     */
    OrganizationLevelEditView.prototype.uiEvents = {
        'level_id:change': function (e) {
            var me = this;
            me.vue.formData.level = u.find(me.vue.levelList, function(item){
                return item.id == e.target.getValue();
            });
        },
        'level_expire_time:change': function (e) {
            this.vue.formData.level_expire_time = moment(e.target.getValue()).unix();
        }
    };

    require('er/util').inherits(OrganizationLevelEditView, FormView);
    return OrganizationLevelEditView;
});
