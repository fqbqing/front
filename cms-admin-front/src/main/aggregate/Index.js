/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AggregateIndex() {
        ListAction.apply(this, arguments);
    }

    AggregateIndex.prototype.modelType = require('./IndexModel');
    AggregateIndex.prototype.viewType = require('./IndexView');

    function updateOnline(e) {
        var me = this;
        var confirm_text = '确定要禁用推广吗?';
        if(e.online > 0 ){
            confirm_text = '确定要恢复推广吗?'
        }
        me.view.waitConfirm(confirm_text).then(function () {
            me.model.updateOnline({
                id: e.id,
                online: e.online
            }).then(function () {
                me.reload();
            });
        });

    }

    function updateWeight(e) {
        var me = this;
        me.model.updateWeight(e.tag).then(function () {
            e.table.setCellText(
                e.tag.weight,
                e.rowIndex,
                e.columnIndex
            );
        });
    }

    /**
     * @protected
     * @override
     */
    AggregateIndex.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updateOnline',updateOnline,this);
        this.view.on('updateWeight',updateWeight,this);

    };

    require('er/util').inherits(AggregateIndex, ListAction);
    return AggregateIndex;
});
