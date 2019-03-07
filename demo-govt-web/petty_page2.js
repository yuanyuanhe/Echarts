$(function() {
    // 左边菜单样式控制
    slideMenu('LJRJGFX', 'LJRJGFX_XEDK');

    var h = document.documentElement.clientHeight;
    setClientHeight(h - 50);

    // 全屏
    $('.head').on('click', '.enter_fullscreen', function() {
        setClientHeight(h);
    });
    // 退出全屏
    $('.right').on('click', '.quit_fullscreen', function() {
        setClientHeight(h - 50);
    });
});

function setClientHeight(h) {
    if (h > 900) {
        var h = h - 50;
        var ih = $("#module1").outerHeight() + 10;
        $("#echart_3,#echart_13").height((h - ih) / 2 - 45 - 20);
        $("#polar_echart").height(h - ih - 45 - 30);
    }
}

$(function() {
    refreshChart3();
    refreshChart13(0);
    refreshPolarChart();

    // 自动切换投资金额、投资笔数
    setInterval(changeChart, 3500);

    $(".head-nav li").click(function() {
        var i = $(this).index();
        index = i;
        $(".head-nav li").removeClass("active");
        $(".head-nav li").eq(i).addClass("active");
        refreshChart13(i);
        refreshChart(i);

    });
});

var index = 0;

function changeChart() {
    $(".head-nav li").removeClass("active");
    $(".head-nav li").eq(index).addClass("active");
    var len = $(".head-nav li").length;
    refreshChart(index);
    refreshChart13(index);
    index++;
    if (index == len) {
        index = 0;
    }
}
//左第一个
var refreshChart = function(n) {
    var e = echarts.init(document.getElementById("echart_1"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var xLabel = [];
    var values = [];
    var smallLoan = [];
    var typeName = [];
    // 同步执行
    $.ajaxSettings.async = false;
    var path = $("#path").val();
    //测试数据
    var testArray3 = {
        message: true,
        agrLoan: [1132, 1616, 1132, 1632, 664],
        message: true,
        name: ["2015年", "2016年", "2017年"],
        smallLoan: [3105.29, 1313.7, 2403.94, 701.35, 1625.79],
        xLabel: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
    }
    xLabel = testArray3.xLabel;

    values = testArray3.agrLoan;
    smallLoan = testArray3.smallLoan;
    typeName = testArray3.name;
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#72849d'
                }
            }
        },
        legend: {
            itemWidth: 12,
            itemGap: 20,
            top: '5',
            right: '5',
            data: ['2015年', '2016年', '2017年'],
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '50',
            left: '20',
            right: '15',
            bottom: '5',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: xLabel,
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#72849d'
                }
            },
            data: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
        }],

        yAxis: [{
            type: 'value',
            name: '单位：亿元',
            /*min: 0,
            max: 20,*/
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#72849d'
                }
            }
        }],

        series: [{
                name: '2015',
                type: 'bar',
                data: [2793.75, 1201.08, 2168.34, 625.41, 1461.35, 770.89, 801.65, 811.55, 902.91],
                barWidth: '15px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(77, 244, 203)'
                        }, {
                            offset: 1,
                            color: 'rgb(24, 183, 178)'
                        }]),
                        barBorderRadius: 10
                    }
                }
            },
            {
                name: '2016',
                type: 'bar',
                barWidth: '15px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(241, 181, 95)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 149, 107)'
                        }]),
                        barBorderRadius: 10
                    }
                },
                data: [3105.29, 1313.7, 2403.94, 701.35, 1625.79, 856.97, 929.14, 939.05, 1023.39]
            },
            {
                name: '2017',
                type: 'bar',
                barWidth: '15px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(241, 181, 95)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 149, 107)'
                        }]),
                        barBorderRadius: 10
                    }
                },
                data: [3551.05, 1461.71, 2748.59, 802.46, 1841.61, 969.86, 1067.6, 972.18, 1160.59]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);

}


// 贷款笔数及环比情况
var refreshChart2 = function() {
    var e = echarts.init(document.getElementById("echart_2"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var xLabel = [];
    var values = [];
    var percent = [];
    var typeName = [];
    // 同步执行
    $.ajaxSettings.async = false;
    var path = $("#path").val();
    // 加载数据
    // $.post(path + 'service/smallLoan/smallLoanData', { type: 2 },
    //     function(json) {
    //         xLabel = json.xLabel;
    //         values = json.yData;
    //         percent = json.percent;
    //         typeName = json.name;
    //     }, "json");
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            top: '10',
            right: '10',
            data: typeName,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '60',
            left: '20',
            right: '20',
            bottom: '25',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: xLabel,
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#72849d'
                }
            }
        }],
        yAxis: [{
                type: 'value',
                name: '单位：笔',
                /*min: 0,
                max: 20,*/
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#72849d'
                    }
                }
            },
            {
                type: 'value',
                /*min: 0,
                max: 40,*/
                interval: 10,
                nameTextStyle: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',
                    formatter: '{value}%'
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [{
                name: '贷款笔数',
                type: 'bar',
                data: values,
                barWidth: '25px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#ff6b6b'
                        }, {
                            offset: 1,
                            color: '#ff9270'
                        }])
                    }
                }
            },
            {
                name: '贷款笔数环比',
                type: 'line',
                yAxisIndex: 1,
                data: percent,
                itemStyle: {
                    normal: {
                        color: '#ff6c6b',
                        lineStyle: {
                            color: '#ff8f8e',
                            type: 'dashed'
                        }
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

// page2 - 各州市
var refreshChart3 = function() {
    var e = echarts.init(document.getElementById("echart_3"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var xLabel = [];
    var values = [];
    var smallLoan = [];
    var typeName = [];
    // 同步执行
    $.ajaxSettings.async = false;
    var path = $("#path").val();
    //测试数据
    var testArray3 = {
        message: true,
        agrLoan: [1132, 1616, 1132, 1632, 664],
        message: true,
        name: ["2015年", "2016年", "2017年"],
        smallLoan: [518, 499, 518, 718, 676],
        xLabel: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
    }

    typeName = testArray3.name;


    option = {
        legend: {
            textStyle: { color: '#FDFFFF' },
            bottom: '5',
            data: ['一般性公共预算收入（亿元）', '公共预算收入增长率']

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            data: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                interval: 0,
                rotate: 40,
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        grid: {
            top: '50',
            left: '20',
            right: '15',
            bottom: '70',
            containLabel: true
        },
        yAxis: [{
                type: 'value',
                name: '单位：亿元',
                // min: 0,
                max: 400,
                interval: 50,
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    color: '#F9F900'
                },
                min: -20,
                max: 20,

                interval: 5,
                nameTextStyle: {
                    color: '#F9F900'
                },

                axisLine: {
                    show: true
                },
                splitLine: { show: false }
            }
        ],
        series: [{
                name: '一般性公共预算收入（亿元）',
                type: 'bar',
                data: [377.85, 216.39, 138.62, 123.84, 119, 114.38, 86.56, 76.24, 65.64],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: '#00c7d6',
                    }

                },
                markLine: {
                    symbol: "none",
                    data: [

                        // 纵轴，默认
                        {
                            silent: false,
                            type: 'average',
                            name: '（预算收入平均值）',
                            itemStyle: {
                                normal: {
                                    color: '#fff',
                                    label: {
                                        formatter: '（预算收入平均值）',
                                        position: 'middle',
                                        color: 'rgba(204, 204, 204, .5)'
                                    }

                                }
                            }
                        },

                    ]
                },
            },
            {
                name: '公共预算收入增长率',
                type: 'line',
                data: [8.03, 17.9, 6.08, 12.8, 13, 3.1, -19.9, 12.8, 11.72],
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#F9F900'
                    }
                },
                markLine: {
                    symbol: "none",
                    data: [

                        // 纵轴，默认
                        {
                            silent: false,
                            yAxis: 0.75,
                            name: '（预算收入平均值）',
                            itemStyle: {
                                normal: {
                                    color: '#fff',
                                    label: {
                                        formatter: '（增长率正负分界线）',
                                        position: 'middle',
                                        color: 'rgba(204, 204, 204, .5)'
                                    }
                                }
                            }
                        }
                    ]
                }
            }


        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshChart11 = function() {
    var e = echarts.init(document.getElementById("echart_11"));

};

// 股权性投资金额与环比情况
var refreshChart12 = function() {
    var e = echarts.init(document.getElementById("echart_12"));

};

// 资金流向
var refreshChart13 = function(n) {

    var e = echarts.init(document.getElementById("echart_13"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var xLabel = [];
    var values = [];
    var smallLoan = [];
    var typeName = [];
    // 同步执行
    $.ajaxSettings.async = false;
    var path = $("#path").val();
    //测试数据
    var testArray3 = {
        message: true,
        agrLoan: [1132, 1616, 1132, 1632, 664],
        message: true,
        name: ["2015年", "2016年", "2017年"],
        smallLoan: [518, 499, 518, 718, 676],
        xLabel: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
    }

    typeName = testArray3.name;
    if (n == 0) {
        option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                data: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40,
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },

            yAxis: [{
                type: 'value',
                name: '',
                min: 0,
                max: 80,
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }],
            series: [{
                name: '税收占比率',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: '#23E9F9',
                    }

                },
                data: [78.46, 77.66, 75.22, 73.31, 72.13, 72.05, 64.8, 72.09, 74.39]
            }]
        };
    } else {
        option = {
            legend: {


            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                data: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40,
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },

            yAxis: [{
                type: 'value',
                name: '',
                min: 0,
                max: 80,
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }],
            series: [{
                name: '财政自给率',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: '#46A3FF',
                    }

                },
                data: [64.87, 33.99, 47.44, 23.47, 31.45, 34.55, 21.58, 29.79, 16.41]
            }]
        };
    }




    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

// 贵州地图
var refreshPolarChart = function() {
    //var e = echarts.init(document.getElementById("polar_echart"));

};


var refreshRoseChart = function() {
    var e = echarts.init(document.getElementById("rose_echart"));

};