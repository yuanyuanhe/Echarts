$(function(){
    // 左边菜单样式控制
    slideMenu('LJRJGFX','LJRJGFX_MJRZ');

    var h = document.documentElement.clientHeight;
    setClientHeight(h-50);

    // 全屏
    $('.head').on('click', '.enter_fullscreen', function(){
        setClientHeight(h);
    });
    // 退出全屏
    $('.right').on('click', '.quit_fullscreen', function(){
        setClientHeight(h-50);
    });
});

function setClientHeight(h) {
    if (h > 900) {
        var h = h - 50;
        var ih = $("#module1").outerHeight()+10;
        $("#echart_1,#echart_2,#echart_3,#echart_4").height((h-ih)/2-45-20);
    }
}

$(function () {
    refreshChart1();
    refreshChart2();
    refreshChart3("amount");
    refreshChart4();

    // 自动切换投资金额、投资笔数
    setInterval(changeInvest, 2000);

    //各类型投资占比情况选择框切换
    $("#invest_1").click(function () {
        $("#invest_1").addClass("active");
        $("#invest_2").removeClass("active");
        refreshChart3("amount");
    });
    $("#invest_2").click(function () {
        $("#invest_1").removeClass("active");
        $("#invest_2").addClass("active");
        refreshChart3("num");
    });
});
var index = 1;
function changeInvest() {
    if (index == 1) {
        $("#invest_1").addClass("active");
        $("#invest_2").removeClass("active");
        refreshChart3("amount");
        index++;
    }
    else {
        $("#invest_1").removeClass("active");
        $("#invest_2").addClass("active");
        refreshChart3("num");
        index = 1;
    }
}

// 贷款金额及环比情况
var refreshChart1 = function () {
    var e = echarts.init(document.getElementById("echart_1"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var values1=[];
    var values2=[];
    var values3=[];
    var values4=[];
    var values5=[];
    var values6=[];
    var year=[];
    var typeName = [];

    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    $.post(path+'service/privateFinancial/selectAmountAndNum', { type: 1},
        function(json){
            values1 = json.cum_list;
            values2=json.acc_list;
            values3=json.short_list;
            values4=json.cum_rate;
            values5=json.acc_rate;
            values6=json.short_rate;
            year=json.year;
            typeName = json.name;
        },"json");
    var option = {
        tooltip : {
            trigger: 'item',
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
            data:['股权投资','债券投资','短期财务性投资','月均回报率'],
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '65',
            left: '20',
            right: '20',
            bottom: '5',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data: year,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    lineStyle:{
                        color:'#72849d'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: '单位：万元',
                /*min: 0,
                 max: 80,*/
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                        color:'#72849d'
                    }
                }
            },
            {
                type: 'value',
                name: '回报率',
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
                axisLine:{
                    show: false
                }
            }
        ],
        series : [
            {
                name:'股权投资',
                type:'bar',
                stack: '金额',
                barWidth: '25px',
                data:values1,
                itemStyle:{
                    normal:{color:'#4d7ad2'}
                }
            },
            {
                name: '月均回报率',
                type:'line',
                yAxisIndex: 1,
                data:values4,
                smooth:true,
                itemStyle : {
                    normal : {
                        color:'#4d7ad2',
                        lineStyle:{
                            color:'#4d7ad2'
                        }
                    }
                }
            },
            {
                name:'债券投资',
                type:'bar',
                stack: '金额',
                barWidth: '25px',
                data:values2,
                itemStyle:{
                    normal:{color:'#f99b69'}
                }
            },
            {
                name: '月均回报率',
                type:'line',
                yAxisIndex: 1,
                data:values5,
                smooth:true,
                itemStyle : {
                    normal : {
                        color:'#f99b69',
                        lineStyle:{
                            color:'#f99b69'
                        }
                    }
                }
            },
            {
                name:'短期财务性投资',
                type:'bar',
                stack: '金额',
                barWidth: '25px',
                data:values3,
                itemStyle:{
                    normal:{color:'#a27afe'}
                }
            },
            {
                name: '月均回报率',
                type:'line',
                yAxisIndex: 1,
                data:values6,
                smooth:true,
                itemStyle : {
                    normal : {
                        color:'#a27afe',
                        lineStyle:{
                            color:'#a27afe'
                        }
                    }
                }
            },
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(".right-body").resize(e.resize);
};

// 贷款笔数及环比情况
var refreshChart2 = function () {
    var e = echarts.init(document.getElementById("echart_2"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var values1=[];
    var values2=[];
    var year=[];
    var typeName = [];

    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    $.post(path+'service/privateFinancial/selectAmountAndNum', { type: 3},
        function(json){
            values1 = json.agric_list;
            values2=json.small_list;
            year=json.year;
            typeName = json.name;
        },"json");
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
            orient: 'vertical',
            bottom: '15',
            right: '5',
            data:typeName,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '45',
            left: '20',
            right: '80',
            bottom: '5',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: year,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    lineStyle:{
                        color:'#72849d'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '单位：万元',
                /*min: 0,
                 max: 20,*/
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                        color:'#72849d'
                    }
                }
            }
        ],
        series: [
            {
                name:'涉农',
                type: 'bar',
                data:values1,
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
                name:'小微',
                type:'bar',
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
                data:values2
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(".right-body").resize(e.resize);
};

// 涉农、小微贷款金额
var refreshChart3 = function (sign) {
    var e = echarts.init(document.getElementById("echart_3"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var values;
    var typeName = [];

    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    $.post(path+'service/privateFinancial/selectAmountAndNum', {type: 2, sign: sign},
        function(json){
            values = json.num;
            typeName = json.name;
        },"json");

    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            itemWidth: 12,
            itemHeight: 12,
            orient: 'vertical',
            right: '10%',
            y : 'center',
            data:typeName,
            textStyle: {
                color: '#fff'
            }
        },
        color: [
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(83, 129, 221)'
            }, {
                offset: 1,
                color: 'rgb(22, 57, 109)'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(224, 181, 98)'
            }, {
                offset: 1,
                color: 'rgb(255, 149, 107)'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(242, 115, 115)'
            }, {
                offset: 1,
                color: 'rgb(238, 67, 67)'
            }])],
        calculable : true,
        series : [
            {
                name:'分布情况',
                type:'pie',
                radius: ['50%', '70%'],
                center: ['45%', '50%'],
                roseType : 'area',
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{c}\n {d}%"
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:values
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(".right-body").resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshChart4 = function () {
    var e = echarts.init(document.getElementById("echart_4"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var values1=[];
    var values2=[];
    var values3=[];
    var year=[];
    var typeName = [];

    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    $.post(path+'service/privateFinancial/selectAmountAndNum', { type: 4},
        function(json){
            values1 = json.holder_list;
            values2=json.pre_list;
            values3=json.dir_list;
            year=json.year;
            typeName = json.name;
        },"json");
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            top: '5',
            right: '10',
            data:typeName,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '50',
            left: '20',
            right: '10',
            bottom: '5',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data: year,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    lineStyle:{
                        color:'#72849d'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: '单位：万元',
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                        color:'#72849d'
                    }
                }
            }
        ],
        series : [
            {
                name:'定向私募',
                type:'line',
                stack: '金额',
                data:values3,
                smooth:true,
                itemStyle:{
                    normal:{
                        areaStyle: {
                            type: 'default'
                        },
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(74, 179, 252, .8)'
                        }, {
                            offset: 1,
                            color: 'rgba(19, 107, 189, .8)'
                        }])
                    }
                }
            },
            {
                name:'股东借款',
                type:'line',
                stack: '金额',
                data:values1,
                smooth:true,
                itemStyle:{
                    normal:{
                        areaStyle: {
                            type: 'default'
                        },
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(224, 181, 98, .8)'
                        }, {
                            offset: 1,
                            color: 'rgba(255, 149, 107, .8)'
                        }])
                    }
                }
            },
            {
                name:'引进优先股东',
                type:'line',
                stack: '金额',
                data:values2,
                smooth:true,
                itemStyle:{
                    normal:{
                        areaStyle: {
                            type: 'default'
                        },
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(77, 244, 203, .8)'
                        }, {
                            offset: 1,
                            color: 'rgba(24, 183, 178, .8)'
                        }])
                    }
                }
            }

        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(".right-body").resize(e.resize);
};