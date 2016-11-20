/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./stat.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');
    var kpiList = require('./config').kpiList;
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OverviewStatView() {
        BaseView.apply(this, arguments);
    }
    OverviewStatView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OverviewStatView.prototype.template = 'TPL_overview_stat';

    /**
     * @inheritDoc
     */
    OverviewStatView.prototype.uiProperties = {
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
            if (name === 'tuanOrderCount') {
                series.push(+item.data[name] + item.data.grouponSignupCount);
            }
            else {
                series.push(+item.data[name]);
            }
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

    OverviewStatView.prototype.getVueOptions = function () {
        return {
            data: {
                selectedKpi: 'tuanOrderCount'
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

    OverviewStatView.prototype.renderKpi = function () {
        var chartOptions = getChartOptions(this.vue.kpi, this.vue.selectedKpi);
        this.get('kpiChart').renderData(chartOptions)
    };

    OverviewStatView.prototype.loadKpi = function (time) {
        var me = this;
        var vm = this.vue;
        this.model.loadKpi(time).then(function (data) {
            vm.kpi = data;
        });
    };

    /**
     * @inheritDoc
     */
    OverviewStatView.prototype.uiEvents = {
        'kpis:change': function (e) {
            this.vue.selectedKpi = e.item.value;
            this.renderKpi();
        },
        'dateRange:change': function (e) {
            var time = e.target.getValue();
            this.loadKpi(time);
        }
    };

    require('er/util').inherits(OverviewStatView, BaseView);
    return OverviewStatView;
});
