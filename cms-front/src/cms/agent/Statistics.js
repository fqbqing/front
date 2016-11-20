/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AgentStatistics() {
        BaseAction.apply(this, arguments);
    }

    AgentStatistics.prototype.modelType = require('./StatisticsModel');
    AgentStatistics.prototype.viewType = require('./StatisticsView');

    function forwardToPage(e) {
        var me = this;
        var query = {
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return me.model.agentActivityStatistics(query).then(function (page) {
            me.view.refresh(page);
        });
    }
    /**
     * @protected
     * @override
     */
    AgentStatistics.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('pageChange', forwardToPage, this);
        this.view.on('pageSizeChange', forwardToPage, this);
    };

    require('er/util').inherits(AgentStatistics, BaseAction);
    return AgentStatistics;
});
