/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./changepwd.tpl.html');

	exports.templateMainTarget = 'TPL_my_changepwd';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            originpwd: '',
            newpwd: '',
            confirmpwd: '',
            error: ''
        },
        methods: {
            submit: function () {
                this.error = '';
                if (!this.originpwd) {
                    this.error = '原密码不能为空';
                    return;
                }
                if (!this.newpwd) {
                    this.error = '新密码不能为空';
                    return;
                }
                if (!this.confirmpwd) {
                    this.error = '请再次输入新密码';
                    return;
                }
                if (this.newpwd !== this.confirmpwd) {
                    this.error = '新密码两次输入不一致';
                    return;
                }
                this.$view.emit('CHANGE_PASSWORD', this.originpwd, this.newpwd);
            }
        }
    };

    return exports;
});

