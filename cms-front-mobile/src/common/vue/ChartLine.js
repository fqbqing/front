/**
 * Created by lifayu on 16/1/27.
 */
define(function () {

    var Vue = require('vue');
    var u = require('underscore');

    var echarts = require('echarts');

    var ChartLine = Vue.extend({
        replace: true,
        props: ['data', 'height'],
        template: '<div :style="{height: height + \'px\'}"></div>',
        ready: function () {
            var legend = u.pluck(this.data.series, 'name');
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data: legend
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '40',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.data.axis
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : this.data.series
            };
            var myChart = echarts.init(this.$el);
            myChart.setOption(option);
            this.chart = myChart;
        },
        destroyed: function () {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    });

    return ChartLine;
});