/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./ad.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AggregateAdView() {
        ListView.apply(this, arguments);
    }
    AggregateAdView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    AggregateAdView.prototype.template = 'TPL_aggregate_ad';

    var tableFields = [
         {
             field: 'title',
             title: '推广标题',
             content: 'title'
         },
         {
             field: 'name',
             title: '推广图片',
             stable: true,
             width: 100,
             content: function (item) {
                 return '<img src="' + item.image_url + '" alt="封面图片" height="50" style="max-width: 100%;"/>';
             }
         },
         {
             field: 'url',
             title: '推广链接',
             content: function (item) {
                 return '<a href="'+ item.url +'">'+ item.url +'</a>';
             }
         },
         {
             field: 'weight',
             title: '权重排序',
             align: 'center',
             content: 'weight'
         },
         {
             field: 'action',
             title: '操作',
             align: 'center',
             content: function (item) {
                 var str = '';
                 if(user.isAllow('ad.update')){
                     str += ' <a href="javascript:void(0);" data-command="update" data-command-args="' + item.id + '">修改</a>';
                 }
                 if(user.isAllow('ad.delete')){
                     str += ' <a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                 }
                 return str;
             }
         }
    ];

    /**
     * @inheritDoc
     */
    AggregateAdView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };

    /**
     * @inheritDoc
     */
    AggregateAdView.prototype.uiEvents = {
        'province_id:change': function (e) {
            this.submitSearch(e);
        },
        'place:change': function (e) {
            this.submitSearch(e);
        },
        'platform:change': function (e) {
            this.submitSearch(e);
        },
        'table:command': function (e) {
            if (e.name === 'update') {
                this.fire('updateAdvertise',{
                    id: e.args
                });

            }else if (e.name === 'delete') {
                this.fire('deleteAdvertise',{
                    ids: [e.args]
                });
            }

        },
        'addAdvertise:click': function (e) {
            this.fire('addAdvertise');
        }

    };

    require('er/util').inherits(AggregateAdView, ListView);
    return AggregateAdView;
});
