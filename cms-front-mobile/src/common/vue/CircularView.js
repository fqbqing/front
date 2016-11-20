/**
 * Created by lifayu on 16/1/27.
 */
define(function () {

    var Vue = require('vue');
    var u = require('underscore');

    var echarts = require('echarts');

    var ChartCircular = Vue.extend({
        replace: true,
        props: ['value', 'size'],
        template: '<div :style="{width: size + \'px\', height: size + \'px\'}"></div>',
        ready: function () {
            var value = +this.value;
            var series = [{
                type: 'pie',
                itemStyle: {
                    normal: {
                        label: {
                            formatter: function (a) {
                                return 100 - a.value + '%';
                            },
                            textStyle: {
                                baseline: 'top'
                            }
                        }
                    }
                },
                center: ['50%', '50%'],
                radius: [35, 40],
                data: [
                    {
                        name: '转化率',
                        value: value,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: '{b}',
                                textStyle: {
                                    baseline: 'center',
                                    color: '#666',
                                    fontSize: 18
                                }
                            }

                        },
                        itemStyle: {
                            normal: {
                                color: '#ff4f4b',
                                labelLine: {
                                    show: true
                                }
                            }
                        }
                    }, {
                        name: 'other',
                        value: 100 - value,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    color: '#333',
                                    fontSize: 16
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ccc',
                                labelLine: {
                                    show: false
                                }
                            }
                        }
                    }
                ]
            }];
            var option = {
                series: series
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

    //Vue.component('chart-circular', ChartCircluar);

    return ChartCircular;
});