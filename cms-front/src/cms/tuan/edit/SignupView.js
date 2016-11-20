/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./signup.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    var u = require('underscore');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanEditSignupView() {
        FormView.apply(this, arguments);
    }
    TuanEditSignupView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    TuanEditSignupView.prototype.template = 'TPL_tuan_edit_signup';
    TuanEditSignupView.prototype.getExtraFormData = function () {
        var intention = [];
        u.each(this.vue.intentions, function (item) {
            intention.push(item);
        });
        return {
            intention: intention.join(',')
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditSignupView.prototype.uiProperties = {

    };
    TuanEditSignupView.prototype.getVueOptions = function () {
        return {
            data: {
                intentions:  this.model.get('formData').intention || ['']
            },
            methods: {
                removeIntention: function (idx) {
                    this.intentions.splice(idx, 1);
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditSignupView.prototype.uiEvents = {
        'addIntentionBtn:click':function(){
            if(this.vue.intentions.length < 10){
                this.vue.intentions.push('');
            }else{
                this.alert('期望车型不超过10项');
            }

        }
    };

    require('er/util').inherits(TuanEditSignupView, FormView);
    return TuanEditSignupView;
});
