/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./editItem.tpl.html');

    exports.templateMainTarget = 'TPL_site_common_editItem';

    exports.vueOptions = {
        data: {
            errorMsg: ''
        },
        ready: function () {
            $(this.$el).find('input').focus();
        },
        methods: {
            submit: function () {
                if($.trim(this.keywords)){
                    this.$view.emit('finish',{
                        keywords: this.keywords
                    });
                }else{
                    this.errorMsg = '不能为空，请重新填写';
                }

            }
        }
    };

    return exports;

});
