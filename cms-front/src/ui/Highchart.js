/**
 * Created by lifayu on 16/4/19.
 */
define(function () {

    var u = require('underscore');
    var lib = require('esui/lib');
    var paint = require('esui/painters');
    var Control = require('esui/Control');

    var Highcharts = require('highcharts');

    /**
     * Highchart控件
     *
     * @extends Control
     * @constructor
     */
    function Highchart(options) {
        Control.apply(this, arguments);
    }

    lib.inherits(Highchart, Control);

    /**
     * 控件类型，始终为`"Highchart"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    Highchart.prototype.type = 'Highchart';

    Highchart.prototype.initStructure = function () {
        this.chartId = lib.getGUID();
        this.main.innerHTML = '<div id="' + this.chartId + '"></div>';
    };

    Highchart.prototype.renderData = function (conf) {
        var me = this;
        conf = conf || {};
        if (me.chart) {
            me.chart.destroy();
        }
        var options = {
            chart: {
                type: 'line',
                height: me.height || 300,
                renderTo: me.chartId
            },
            title: {
                text: conf.title,
                x: -20 //center
            },
            subtitle: {
                text: conf.subtitle,
                x: -20
            },
            xAxis: {
                categories: conf.categories || []
            },
            yAxis: {
                title: {
                    text: conf.yAxisTitle
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                //valueSuffix: '°C'
            },
            rangeSelector: {
                enabled: false
            },
            series: conf.series || []
        };
        me.chart = new Highcharts.Chart(options);
    };

    Highchart.prototype.dispose = function () {
        if (!this.helper.isInStage('DISPOSED')) {
            this.helper.beforeDispose();

            if (this.chart) {
                this.chart.destroy();
            }

            this.helper.dispose();
            this.helper.afterDispose();
        }
    };

    Highchart.prototype.repaint = paint.createRepaint(
        Control.prototype.repaint,
        {
            name: ['conf'],
            paint: function (me, conf) {
                conf = {
                    //title: 'test',
                    categories: [1, 2, 3],
                    series: [{
                        name: 'HH',
                        data: [1, 2, 3]
                    }]
                };
                me.renderData(conf);
            }
        }
    );

    require('esui').register(Highchart);

    return Highchart;
});