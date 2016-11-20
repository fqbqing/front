/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function LevelListView() {
        ListView.apply(this, arguments);
    }
    LevelListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    LevelListView.prototype.template = 'TPL_level_list';

    var tableFields = [
        {
            field: 'id',
            title: 'ID',
            align: 'center',
            width: 100,
            stable: true,
            sortable: true,
            content: 'id'
        },
         {
             field: 'name',
             title: '级别名称',
             content: 'name'
         },
         {
             field: 'action',
             title: '操作',
             width: 200,
             align: 'center',
             stable: true,
             content: function (item) {
                 var str = '';
                 if (user.isAllow('level.update-permissions')) {
                     str += '<a href="#/level/authorization~id=' + item.id + '">权限</a>';
                 }
                 if (user.isAllow('level.delete')) {
                     str += '<a href="javascript:void(0);" data-command="delete" data-command-args="' + item.id + '">删除</a>';
                 }
                 return str;
             }
         }
    ];

    /**
     * @inheritDoc
     */
    LevelListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }

    };

    /**
     * Vue相关配置
     * @return {Object}
     */
    LevelListView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                state: {
                    add: false
                },
                levelname: ''
            },
            methods: {
                addLevel: function () {
                    me.fire('addLevel', {
                        name: this.levelname
                    });
                }
            }
        };
    };

    /**
     * @inheritDoc
     */
    LevelListView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'delete') {
                this.fire('deleteLevel', {
                    ids: [e.args]
                });
            }
            else {
                this.fire(e.name, {
                    name: e.args
                });
            }
        }
    };

    require('er/util').inherits(LevelListView, ListView);
    return LevelListView;
});
