/**
 * @file highcharts主题
 * @author lifayu@baidu.com
 */

define(function (require) {

    var Highcharts = require('highcharts');
    //require('highcharts/highcharts.nodata');

    var $ = require('jquery');


    function xAxisLabelFormatter() {
        // TODO 根据时间间隔动态调整精度
        return Highcharts.dateFormat('%H:%M:%S', this.value);
    }

    function tooltipFormatter() {
        //var s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b>';
        var s = '<b>' + this.x + '</b>';
        s += '<table>';
        $.each(this.points, function (i, point) {
            s += '<tr><th style="color:' + point.series.color + '">'
                + point.series.name + ':</th><td>' + point.y + '</td></tr>';
        });
        s += '</table>';
        return s;
    }


    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: '.',
            downloadJPEG: '下载JPEG图片',
            exportButtonTitle: '下载图片',
            printButtonTitle: '打印报表',
            numericSymbols: ['k', 'M'],
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            resetZoom: '还原',
            resetZoomTitle: '还原到默认比例',
            loading: '加载中……'
        },
        credits: {
            enabled: true,
            text: '',
            //            href: 'javascript:void(0);',
            style: {
                color: '#ccc',
                fontSize: '12px'
            },
            image: {
                url: require.toUrl('common/img/credit.png'),
                width: 38,
                height: 13,
                x: -50,
                y: -15
            }
        },
        colors: [
            '#4a90ea', '#80699B', '#ea8010', '#AA4643',
            '#89A54E', '#3D96AE', '#92A8CD', '#A47D7C',
            '#B5CA92', '#4572A7'
        ],
        chart: {
            //backgroundColor: '#fff',
            backgroundColor: null,
            borderWidth: 1,
            borderColor: '#26323C',
            borderRadius: 0,
            plotBackgroundColor: null,
            plotShadow: false,
            plotBorderWidth: 0
        },
        title: {
            style: {
                color: '#999',
                font: '14px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#DDD',
                font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        },
        xAxis: {
            gridLineWidth: 0,
            lineColor: '#999',
            tickColor: '#999',
            tickLength: 3,
            offset: 0,
            labels: {
                //formatter: xAxisLabelFormatter,
                style: {
                    color: '#999',
                    fontSize: 10
                }
            },
            title: {
                style: {
                    color: '#aaa',
                    font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            }
        },
        yAxis: {
            alternateGridColor: null,
            minorTickInterval: null,
            gridLineColor: 'rgba(151, 151, 151, .1)',
            minorGridLineColor: 'rgba(255,255,255,0.07)',
            lineWidth: 0,
            tickWidth: 0,
            minPadding: 0,
            labels: {
                style: {
                    color: '#666'
                }
            },
            title: {
                style: {
                    color: '#999',
                    font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#fff',
                fontSize: 10
            },
            itemHoverStyle: {
                color: '#fff'
            },
            itemHiddenStyle: {
                color: '#999'
            },
            symbolHeight: 8,
            margin: 0
        },
        labels: {
            style: {
                color: '#fff'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(244, 244, 244, .8)',
            borderWidth: 1,
            borderRadius: 4,
            style: {
                color: '#666'
            },
            crosshairs: true,
            shared: true,
            shadow: false,
            useHTML: true,
            formatter: tooltipFormatter
        },

        plotOptions: {
            series: {
                nullColor: '#444444'
            },
            line: {
                dataLabels: {
                    color: '#CCC'
                },
                marker: {
                    lineColor: '#333'
                },
                turboThreshold: 1000
            },
            area: {
                fillOpacity: 0.3,
                lineWidth: 1,
                states: {
                    hover: {
                        enabled: true,
                        lineWidthPlus: 0,
                        lineWidth: 0
                    }
                }
            },
            arearange: {
                fillOpacity: 0.3,
                lineWidth: 0,
                states: {
                    hover: {
                        lineWidth: 0
                    }
                }
            },
            spline: {
                marker: {
                    lineColor: '#333'
                }
            },
            scatter: {
                marker: {
                    lineColor: '#333'
                }
            },
            candlestick: {
                lineColor: 'white'
            }
        },
        rangeSelector: {
            enabled: false
        },
        toolbar: {
            itemStyle: {
                color: '#CCC'
            }
        },
        navigator: {
            height: 16,
            outlineWidth: 0,
            enabled: false,
            margin: 0,
            handles: {
                backgroundColor: 'rgba(128, 179, 236, 0.4)',
                borderColor: 'rgba(128, 179, 236, 0.6)'
            }
        },
        // special colors for some of the demo examples
        // legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
        // background2: 'rgb(70, 70, 70)',
        dataLabelsColor: '#444',
        textColor: '#666',
        maskColor: 'rgba(255,255,255,0.3)'
    });

});
