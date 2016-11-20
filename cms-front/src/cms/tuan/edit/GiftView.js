/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./gift.tpl.html');
    var u = require('underscore');
    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanEditGiftView() {
        FormView.apply(this, arguments);
    }
    TuanEditGiftView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    TuanEditGiftView.prototype.template = 'TPL_tuan_edit_gift';

    /**
     * @inheritDoc
     */
    TuanEditGiftView.prototype.uiProperties = {

    };

    TuanEditGiftView.prototype.getExtraFormData = function () {
        var gifts = [];
        u.each(this.vue.gifts, function (item) {
            gifts.push(item.title+':'+item.content);
        });
        return {
            gift: gifts.join('\n')
        };
    };

    TuanEditGiftView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                gifts: me.model.get('formData').gift || [{
                    title: '',
                    content: ''
                }]
            },
            methods: {
                removeGift: function (idx) {
                    this.gifts.splice(idx, 1);
                }
            }
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditGiftView.prototype.uiEvents = {
        'addGiftBtn:click':function(){
            if(this.vue.gifts.length < 10){
                this.vue.gifts.push({
                    title: '',
                    content: ''
                });
            }else{
                this.alert('多重豪礼不超过10项');
            }
        }
    };

    require('er/util').inherits(TuanEditGiftView, FormView);
    return TuanEditGiftView;
});
