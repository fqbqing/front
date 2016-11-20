/**
 * Created by lifayu on 16/1/13.
 */
define(function (require) {

    return {
        editorOptions: {
            serverUrl: "/ueditor/controller.php",
            //serverUrl: '/api/image/upload',
            themePath: '/dep/ueditor/1.4.3/themes/',
            initialFrameHeight:300,
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'strikethrough',
                'superscript', 'subscript', 'removeformat', 'formatmatch',
                'pasteplain', '|', 'forecolor',
                'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'link', 'unlink', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'simpleupload', 'insertimage', 'insertvideo',
                'insertframe',
                'template', '|',
                'horizontal', 'spechars', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow',
                'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown',
                'splittocells', 'splittorows', 'splittocols', '|',
                'preview'
            ]]
        }
    };
});