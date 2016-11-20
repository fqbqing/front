/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function StaffGroupAddView() {
        FormView.apply(this, arguments);
    }

    StaffGroupAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    StaffGroupAddView.prototype.template = 'TPL_staff_group_add';

    StaffGroupAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            //data: {
            //    users: me.model.get('formData').users || []
            //},
            //methods: {
            //    removeSelectedUser: function (user) {
            //        this.users.splice(u.findIndex(this.users, {
            //            id: user.id
            //        }), 1);
            //    }
            //}
        };
    };

    /**
     * @inheritDoc
     */
    StaffGroupAddView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    StaffGroupAddView.prototype.uiEvents = {};

    require('er/util').inherits(StaffGroupAddView, FormView);
    return StaffGroupAddView;
});
