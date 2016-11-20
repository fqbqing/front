/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./index.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AggregateIndexView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AggregateIndexView.prototype.template = 'TPL_aggregate_index';

    var tableFields = [
        {
            field: 'title',
            title: '推广标题',
            content: function (item) {
                if (this.ordertype == 2){
                    return item.activity ? item.activity.name : '无';
                }
                return item.activity ? item.activity.title : '无';
            }
        },
        {
            field: 'name',
            title: '推广图片',
            content: function (item) {
                if(item.activity){
                    if (this.ordertype == 2){
                        return '<img src="' + item.activity.image + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
                    }
                    return '<img src="' + item.activity.image_url + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
                }
                return ;
            }
        },
        {
            field: 'weight',
            title: '权重排序',
            editable: 1,
            stable: true,
            width: 160,
            content: 'weight'
        },
        {
            field: 'action',
            title: '操作',
            content: function (item) {
                var str = '';
                if(user.isAllow('aggregate.update')){
                    if(item.online == 1){
                        str += ' <a href="javascript:void(0);" data-command="update" data-command-args="' + item.id + ',' + item.online + '">禁用</a>';
                    }
                    else {
                        str += ' <a href="javascript:void(0);" data-command="update" data-command-args="' + item.id + ',' + item.online + '">恢复推广</a>';
                    }
                }

                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    AggregateIndexView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            editable: 1
        }

    };


    AggregateIndexView.prototype.getExtraSearchArgs = function () {
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
    AggregateIndexView.prototype.uiEvents = {
        'table:saveedit': function (e) {
            var row = e.target.datasource[e.rowIndex];
            if (e.field.field === 'weight') {
                this.fire('updateWeight', {
                    table: e.target,
                    tag: {
                        weight: e.value,
                        id: row.id
                    },
                    rowIndex: e.rowIndex,
                    columnIndex: e.columnIndex
                });
            }
        },
        'table:command': function (e) {
            var param = e.args.split(',');
            if (e.name === 'update') {
                this.fire('updateOnline', {
                    id: param[0],
                    online: param[1] == 1 ? 0 : 1
                });
            }
        },
        'province_id:change': function (e) {
            this.submitSearch(e);
        },
        'type:change': function (e) {
            this.submitSearch(e);
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(AggregateIndexView, ListView);
    return AggregateIndexView;
});
