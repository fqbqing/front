/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var api = require('common/config').api;


    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function MessageAddView() {
        FormView.apply(this, arguments);
    }

    MessageAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    MessageAddView.prototype.template = 'TPL_message_add';

    /**
     * @inheritDoc
     */
    MessageAddView.prototype.uiProperties = {

    };


    /**
     * Vue相关配置
     * @return {Object}
     */
    MessageAddView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                owners: null
            },
            methods: {

            }
        };
    };
    /**
     * @inheritDoc
     */
    MessageAddView.prototype.uiEvents = {
        'submitDrafts:click': function () {
            if(this.model.get('id')){
                this.model.submitRequester = api.updateMessageJobGraft;
            }else{
                this.model.submitRequester = api.saveMessageJob;
            }
            this.fire('submit');
        },
        'submit:click': function () {
            this.model.submitRequester = api.sendMessageJob;
            this.fire('submit');
        }

    };

    require('er/util').inherits(MessageAddView, FormView);
    return MessageAddView;
});
