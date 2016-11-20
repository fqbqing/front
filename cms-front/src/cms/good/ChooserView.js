/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./chooser.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodChooserView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodChooserView.prototype.template = 'TPL_good_chooser';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            align: 'center',
            stable: true,
            width: 80,
            content: function (item) {
                return item.id;
            }
        },
        {
            field: 'bn',
            title: '商品编号',
            align: 'center',
            stable: true,
            width: 80,
            content: 'bn'
        },
        //{
        //    field: 'image_url',
        //    title: '封面图片',
        //    stable: true,
        //    width: 160,
        //    content: function (item) {
        //        return '<img src="' + item.image_url + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
        //    }
        //},
        {
            field: 'name',
            title: '商品名称',
            content: 'name'
        },
        {
            field: 'marketable',
            title: '是否上架',
            stable: true,
            align: 'center',
            width: 70,
            content: function (item) {
                return item.marketable == 1 ? '是' : '否';
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodChooserView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            select: '@selectType',
            selectMode: 'line',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">暂无可选择商品</p>'
        }
    };

    GoodChooserView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var name = this.get('searchbox').getValue();
        if (name) {
            args.name = name;
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    GoodChooserView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(GoodChooserView, ListView);
    return GoodChooserView;
});
