/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function MessageAddModel() {
        FormModel.apply(this, arguments);

        if(this.get('id')){
            // 表单数据请求器
            this.formRequester = api.getMessageJobDraftInfo;
        }
        // 表单提交请求器 (*)
        //this.submitRequester = api.addMessageJob;
        //this.submitRequester = api.sendMessageJobGraft;
    }


    /**
     * @inheritDoc
     */
    MessageAddModel.prototype.datasource = {
        editorOptions: function () {
            return {
                serverUrl: "/ueditor/controller.php",
                themePath: '/dep/ueditor/1.4.3/themes/',
                initialFrameHeight:300,
                toolbars: [[
                    'bold', 'italic', 'underline', 'strikethrough',
                    'removeformat', 'formatmatch', '|', 'forecolor',
                    'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                    'link', 'unlink', 'horizontal', 'spechars', '|','simpleupload','insertimage'
                ]]
            };
        }
    };


    /**
     * @inheritDoc
     */
    MessageAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    MessageAddModel.prototype.getExtraData = function () {
        var param = {};
        if(this.get('id')){
            param.draft_id = this.get('id');
            param.id = this.get('id');
        }
        return param;
    };

    /**
     * @inheritDoc
     */
    MessageAddModel.prototype.filterData = function (data) {
        return data;

    };

    // return模块
    require('er/util').inherits(MessageAddModel, FormModel);
    return MessageAddModel;
});
