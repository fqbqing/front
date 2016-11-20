/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function ImageListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    ImageListView.prototype.template = 'TPL_image_list';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            content: function (item) {
                return '#' + item.id;
            }
        },
        {
            field: 'pc_image',
            title: 'PC端图片',
            content: ''
        },
        {
            field: 'mobile_image',
            title: '关联移动版图片',
            content: ''
        },
        {
            field: 'email',
            title: '图片路径',
            content: function (item) {
                var str = 'PC端图片：/image/ </br>关联移动版图片：/image/';
                return str;
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            width: 60,
            content: function (item) {
                var str = '<a href="#/image/edit~id=' + item.id + '">关联移动版图片</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    ImageListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };

    /**
     * @inheritDoc
     */
    ImageListView.prototype.uiEvents = {
        'addBtn:click': function () {
            this.fire('addImage');
        }
    };

    require('er/util').inherits(ImageListView, ListView);
    return ImageListView;
});
