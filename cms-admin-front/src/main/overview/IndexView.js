/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./index.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    var u = require('underscore');
    var kpiList = require('./config').kpiList;
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OverviewIndexView() {
        BaseView.apply(this, arguments);
    }

    OverviewIndexView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    OverviewIndexView.prototype.template = 'TPL_overview_index';

    /**
     * @inheritDoc
     */
    OverviewIndexView.prototype.uiProperties = {
        dateRange: {
            format: 'YYYY-MM-DD',
            timePicker: false,
            chosenLabel: '最近7天',
            ranges: {
                '今天': [moment().startOf('days'), function () {
                    return moment();
                }],
                '昨天': [
                    moment().startOf('days').subtract(1, 'days'),
                    moment().endOf('days').subtract(1, 'days')
                ],
                '最近7天': [moment().subtract(6, 'days'), function () {
                    return moment();
                }],
                '最近30天': [moment().subtract(29, 'days'), function () {
                    return moment();
                }]
            }
        },
        kpiTypeRadio: {
            datasource: [{
                text: '今日',
                value: 'today'
            }, {
                text: '总量',
                value: 'all'
            }]
        },
        kpis: {
            datasource: '@kpiList'
        }
    };

    function getChartOptions(kpi, name) {
        var cate = [];
        var series = [];
        u.each(kpi, function (item) {
            cate.push(item.date);
            series.push(+item.data[name]);
        });
        var k = u.findWhere(kpiList, {
            value: name
        });
        return {
            categories: cate,
            series: [{
                name: k ? k.text : name,
                data: series
            }]
        };
    }

    OverviewIndexView.prototype.getVueOptions = function () {
        return {
            data: {
                kpiType: 'today',
                selectedKpi: 'organizationCount'
            },
            watch: {
                kpi: function () {
                    this.$view.renderKpi();
                }
            },
            ready: function () {
                this.$nextTick(function () {
                    this.$view.renderKpi();
                });
            }
        };
    };

    OverviewIndexView.prototype.renderKpi = function () {
        var chartOptions = getChartOptions(this.vue.kpi, this.vue.selectedKpi);
        this.get('kpiChart').renderData(chartOptions)
    };

    OverviewIndexView.prototype.loadKpi = function (time) {
        var me = this;
        var vm = this.vue;
        this.model.loadKpi(time).then(function (data) {
            vm.kpi = data;
        });
    };

    /**
     * @inheritDoc
     */
    OverviewIndexView.prototype.uiEvents = {
        'kpiTypeRadio:change': function (e) {
            this.vue.kpiType = e.item.value;
        },
        'kpis:change': function (e) {
            this.vue.selectedKpi = e.item.value;
            this.renderKpi();
        },
        'dateRange:change': function (e) {
            var time = e.target.getValue();
            this.loadKpi(time);
        }
    };

    require('er/util').inherits(OverviewIndexView, BaseView);
    return OverviewIndexView;
});
