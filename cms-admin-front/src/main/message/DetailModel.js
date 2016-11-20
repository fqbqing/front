/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function MessageDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    MessageDetailModel.prototype.datasource = {
        notice: function (model) {
            return api.getMessageJobInfo({
                id: model.get('id')
            })
        },
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
                    'link', 'unlink', 'horizontal', 'spechars'
                ]]
            };
        }
    };


    // return模块
    require('er/util').inherits(MessageDetailModel, BaseModel);
    return MessageDetailModel;
});
