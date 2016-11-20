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
    function AccessGroupAddView() {
        FormView.apply(this, arguments);
    }

    AccessGroupAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AccessGroupAddView.prototype.template = 'TPL_access_group_add';

    /**
     * @inheritDoc
     */
    AccessGroupAddView.prototype.uiProperties = {

    };

    AccessGroupAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                users: me.model.get('formData').users || []
            },
            methods: {
                removeSelectedUser: function (user) {
                    this.users.splice(u.findIndex(this.users, {
                        id: user.id
                    }), 1);
                }
            }
        };
    };


    /**
     * 获取当前表单需要提交的额外数据
     *
     * @return {Object} 表单数据
     */
    AccessGroupAddView.prototype.getExtraFormData = function () {
        /*var vue = this.vue;
        var user_ids = u.pluck(vue.users, 'id');
        return {
            users: user_ids.join(',')
        };*/
    };
    /**
     * @inheritDoc
     */
    AccessGroupAddView.prototype.uiEvents = {
        'addUserBtn:click': function(e){
            this.fire('addUser');
        },
        'addPrivilegeBtn:click':function(){
            this.fire('addPrivilege');
        }
    };

    require('er/util').inherits(AccessGroupAddView, FormView);
    return AccessGroupAddView;
});
