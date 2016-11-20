/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./chooser.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodCategoryChooserView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    GoodCategoryChooserView.prototype.template = 'TPL_good_category_chooser';

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
            field: 'name',
            title: '名称',
            content: 'name'
        },
        {
            field: 'category_name',
            title: '父级名称',
            content: function (item) {
                return item.category ? item.category.name : ' - ';
            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        }
    ];

    /**
     * @inheritDoc
     */
    GoodCategoryChooserView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            select: '@selectType',
            selectMode: 'line',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">暂无可选择分类</p>'
        }

    };

    GoodCategoryChooserView.prototype.getExtraSearchArgs = function () {
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
    GoodCategoryChooserView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(GoodCategoryChooserView, ListView);
    return GoodCategoryChooserView;
});
